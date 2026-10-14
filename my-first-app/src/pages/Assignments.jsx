import { useEffect, useState } from "react";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [duedate, setDuedate] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/assignments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }
        return response.json();
      })
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load assignments data");
        setLoading(false);
      });
  }, []);

  function addAssignment() {
    fetch("http://localhost:5000/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, Topic: topic, duedate }),
    })
      .then((response) => response.json())
      .then((newItem) => {
        setAssignments([...assignments, newItem]);
        setTitle("");
        setTopic("");
        setDuedate("");
      });
  }

  function updateStatus(id, status) {
    fetch(`http://localhost:5000/api/assignments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then((updated) => {
        setAssignments(assignments.map((item) => (item._id === id ? updated : item)));
      });
  }

  function deleteAssignment(id) {
    fetch(`http://localhost:5000/api/assignments/${id}`, { method: "DELETE" })
      .then(() => {
        setAssignments(assignments.filter((item) => item._id !== id));
      });
  }

  if (loading) {
    return <p>Data is loading...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const pending = assignments.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <div className="container mt-4">
      <h2 className="mb-1">Assignments</h2>
      <p className="text-muted mb-4">{pending} Pending</p>

      <div className="d-flex gap-2 mb-4">
        <input className="form-control" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="form-control" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <input type="date" className="form-control" value={duedate} onChange={(e) => setDuedate(e.target.value)} />
        <button className="btn btn-primary" onClick={addAssignment}>Add</button>
      </div>

      <ul className="list-group">
        {assignments.map((item) => (
          <li className="list-group-item" key={item._id}>
            <div className="d-flex align-items-start gap-2">
              <div>
                <h5 className="mb-2">{item.title}</h5>

                <p className="mb-1">
                  <strong>Topic:</strong> {item.Topic}
                </p>

                <p className="mb-1">
                  <strong>Due Date:</strong> {item.duedate}
                </p>

                <div className="d-flex align-items-center gap-2">
                  <strong>Status:</strong>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={item.status}
                    onChange={(e) => updateStatus(item._id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <span
                className={`badge ms-auto ${
                  item.status === "Completed"
                    ? "bg-success"
                    : item.status === "In Progress"
                    ? "bg-primary"
                    : "bg-warning text-dark"
                }`}
              >
                {item.status}
              </span>

              <button className="btn btn-outline-danger btn-sm" onClick={() => deleteAssignment(item._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
