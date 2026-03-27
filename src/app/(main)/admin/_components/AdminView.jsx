"use client";

import {useState} from "react";
import {
  approveApplication,
  rejectApplication,
} from "@/actions/application.action";
import {toast} from "sonner";

export default function AdminView({applications}) {
  const [list, setList] = useState(applications);
  const [loadingId, setLoadingId] = useState(null);

  const handleApprove = async (id) => {
    setLoadingId(id);
    try {
      const result = await approveApplication(id);
      if (result.success) {
        toast.success(result.message, {duration: 10000});
        setList((prev) => prev.filter((a) => a._id !== id));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    setLoadingId(id);
    try {
      const result = await rejectApplication(id);
      if (result.success) {
        toast.success(result.message);
        setList((prev) => prev.filter((a) => a._id !== id));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  const pending = list.filter((a) => a.status === "pending");

  return (
    <div className="max-w-4xl mx-auto mt-16 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin — Applications</h1>
      {pending.length === 0 ? (
        <p className="text-gray-500">No pending applications.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {pending.map((app) => (
            <div
              key={app._id}
              className="border rounded p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{app.applicantName}</p>
                  <p className="text-sm text-gray-500">
                    {app.email} — {app.university}
                  </p>
                  <p className="text-sm">
                    Applying as:{" "}
                    <span className="font-medium">{app.applyingAs}</span>
                  </p>
                  <p className="text-sm mt-1">{app.motivation}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleApprove(app._id)}
                    disabled={loadingId === app._id}
                    className="bg-emerald-500 text-white px-3 py-1 rounded text-sm hover:bg-emerald-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(app._id)}
                    disabled={loadingId === app._id}
                    className="bg-rose-500 text-white px-3 py-1 rounded text-sm hover:bg-rose-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
