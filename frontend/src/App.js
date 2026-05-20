import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    notes: "",
  });

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get("https://job-application-tracker-usfn.vercel.app/api/jobs/");
      setJobs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Add or Update Job
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId !== null) {
        await axios.put(
          `https://job-application-tracker-usfn.vercel.app/api/jobs/${editingId}`,
          {
            company: form.company,
            role: form.role,
            status: form.status,
            date: form.date,
            notes: form.notes,
          }
        );

        setEditingId(null);
      } else {
        await axios.post("https://job-application-tracker-usfn.vercel.app/api/jobs/", form);
      }

      setForm({
        company: "",
        role: "",
        status: "Applied",
        date: "",
        notes: "",
      });

      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Job
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://job-application-tracker-usfn.vercel.app/api/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit Job
  const handleEdit = (job) => {
    setEditingId(job.id);

    setForm({
      company: job.company,
      role: job.role,
      status: job.status,
      date: job.date,
      notes: job.notes,
    });
  };

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>

      <form className="job-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
          required
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Selected</option>
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) =>
            setForm({ ...form, notes: e.target.value })
          }
        />

        <button type="submit">
          {editingId !== null ? "Update Job" : "Add Job"}
        </button>
      </form>

      <div className="job-list">
        {jobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h2>{job.company}</h2>

            <p><strong>Role:</strong> {job.role}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Date:</strong> {job.date}</p>
            <p><strong>Notes:</strong> {job.notes}</p>

            <div className="buttons">
              <button
                className="edit-btn"
                onClick={() => handleEdit(job)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(job.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;