"use client";

import {useState} from "react";
import {submitApplication} from "@/actions/application.action";
import {toast} from "sonner";

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    applicantName: "",
    email: "",
    university: "",
    applyingAs: "student",
    motivation: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await submitApplication(form);
      if (result.success) {
        toast.success(result.message);
        setForm({
          applicantName: "",
          email: "",
          university: "",
          applyingAs: "student",
          motivation: "",
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-16 p-6">
      <h1 className="text-2xl font-bold mb-6">Apply to Join</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="applicantName"
          placeholder="Full Name"
          value={form.applicantName}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          name="university"
          placeholder="University"
          value={form.university}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <select
          name="applyingAs"
          value={form.applyingAs}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="student">Student</option>
          <option value="researcher">Researcher</option>
        </select>
        <textarea
          name="motivation"
          placeholder="Why do you want to join?"
          value={form.motivation}
          onChange={handleChange}
          required
          rows={4}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white py-2 rounded hover:bg-orange-500"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
