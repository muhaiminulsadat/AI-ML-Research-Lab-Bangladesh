"use client";

import {useState} from "react";
import {
  approveApplication,
  rejectApplication,
} from "@/actions/application.action";
import {revokeMember, changeRole} from "@/actions/user.action";
import {toast} from "sonner";

export default function AdminView({applications, members}) {
  const [list, setList] = useState(applications);
  const [memberList, setMemberList] = useState(members);
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
    } catch {
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
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleRevoke = async (id) => {
    setLoadingId(id);
    try {
      const result = await revokeMember(id);
      if (result.success) {
        toast.success(result.message);
        setMemberList((prev) => prev.filter((m) => m._id !== id));
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleRoleChange = async (id, role) => {
    if (role === "admin") {
      const confirmed = window.confirm(
        "Are you sure you want to promote this user to Admin?",
      );
      if (!confirmed) return;
    }

    setLoadingId(id);
    try {
      const result = await changeRole(id, role);
      if (result.success) {
        toast.success(result.message);
        setMemberList((prev) =>
          prev.map((m) => (m._id === id ? {...m, role} : m)),
        );
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  const pending = list.filter((a) => a.status === "pending");

  return (
    <div className="w-full max-w-[1600px] mx-auto mt-12 p-6 lg:px-12 flex flex-col gap-12">
      {/* Applications */}
      <section>
        <h2 className="text-xl font-bold mb-4">Pending Applications</h2>
        {pending.length === 0 ? (
          <p className="text-gray-500">No pending applications.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {pending.map((app) => (
              <div
                key={app._id}
                className="border rounded p-4 flex justify-between items-start"
              >
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
            ))}
          </div>
        )}
      </section>

      {/* Members */}
      <section>
        <h2 className="text-xl font-bold mb-4">Approved Members</h2>
        {memberList.length === 0 ? (
          <p className="text-gray-500">No approved members yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {memberList.map((member) => (
              <div
                key={member._id}
                className="border rounded p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-500">
                    {member.email} — {member.university}
                  </p>
                  <p className="text-sm">
                    Type:{" "}
                    <span className="font-medium">
                      {member.memberType || "—"}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <select
                    defaultValue={member.role}
                    onChange={(e) =>
                      handleRoleChange(member._id, e.target.value)
                    }
                    disabled={loadingId === member._id}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="general">General</option>
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => handleRevoke(member._id)}
                    disabled={loadingId === member._id}
                    className="bg-rose-500 text-white px-3 py-1 rounded text-sm hover:bg-rose-600"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
