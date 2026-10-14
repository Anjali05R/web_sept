import { useEffect, useState } from "react";

export default function Attendances() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [subject, setSubject] = useState("");
  const [held, setHeld] = useState("");
  const [attended, setAttended] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  function fetchAttendance() {
    fetch("http://localhost:5000/api/attendance")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch attendance");
        }
        return response.json();
      })
      .then((data) => {
        setAttendance(data);
        setError("");
      })
      .catch(() => {
        setError("Could not load attendance data");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function resetForm() {
    setSubject("");
    setHeld("");
    setAttended("");
    setEditId(null);
  }

  function saveAttendance() {
    if (!subject.trim() || held === "" || attended === "") {
      setError("Please fill in all fields.");
      return;
    }

    const heldCount = Number(held);
    const attendedCount = Number(attended);

    if (
      !Number.isInteger(heldCount) ||
      !Number.isInteger(attendedCount) ||
      heldCount < 0 ||
      attendedCount < 0 ||
      attendedCount > heldCount
    ) {
      setError(
        "Enter valid class counts. Attended classes cannot exceed classes held."
      );
      return;
    }

    const record = {
      subject: subject.trim(),
      held: heldCount,
      attended: attendedCount,
    };

    const url = editId
      ? `http://localhost:5000/api/attendance/${editId}`
      : "http://localhost:5000/api/attendance";

    fetch(url, {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to save attendance");
        }
        return response.json();
      })
      .then((savedItem) => {
        if (editId) {
          setAttendance(
            attendance.map((item) =>
              item._id === editId ? savedItem : item
            )
          );
        } else {
          setAttendance([...attendance, savedItem]);
        }

        resetForm();
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Could not save attendance.");
      });
  }

  function editAttendance(item) {
    setEditId(item._id);
    setSubject(item.subject);
    setHeld(String(item.held));
    setAttended(String(item.attended));
    setError("");
  }

  function deleteAttendance(id) {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      return;
    }

    fetch(`http://localhost:5000/api/attendance/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete attendance");
        }

        setAttendance((current) =>
          current.filter((item) => item._id !== id)
        );

        if (editId === id) {
          resetForm();
        }

        setError("");
      })
      .catch(() => {
        setError("Could not delete attendance record.");
      });
  }

  if (loading) {
    return <p>Data is loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-1">Attendance</h2>

      <p className="text-muted mb-4">
        {attendance.length} Subject Records
      </p>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <div className="d-flex flex-wrap gap-2 mb-4">
        <input
          className="form-control"
          style={{ flex: "2 1 180px" }}
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="number"
          min="0"
          className="form-control"
          style={{ flex: "1 1 130px" }}
          placeholder="Classes Held"
          value={held}
          onChange={(e) => setHeld(e.target.value)}
        />

        <input
          type="number"
          min="0"
          className="form-control"
          style={{ flex: "1 1 140px" }}
          placeholder="Classes Attended"
          value={attended}
          onChange={(e) => setAttended(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={saveAttendance}
        >
          {editId ? "Update" : "Add"}
        </button>

        {editId && (
          <button
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </div>

      {attendance.length === 0 ? (
        <p className="text-muted">No attendance records found.</p>
      ) : (
        <ul className="list-group">
          {attendance.map((item) => {
            const percentage =
              item.held > 0
                ? ((item.attended / item.held) * 100).toFixed(1)
                : "0.0";

            return (
              <li className="list-group-item" key={item._id}>
                <div className="d-flex flex-wrap align-items-start gap-3">
                  <div className="flex-grow-1">
                    <h5 className="mb-2">{item.subject}</h5>

                    <p className="mb-1">
                      <strong>Classes Held:</strong> {item.held}
                    </p>

                    <p className="mb-1">
                      <strong>Classes Attended:</strong>{" "}
                      {item.attended}
                    </p>

                    <p className="mb-0">
                      <strong>Attendance:</strong>{" "}
                      <span
                        className={`badge ${
                          Number(percentage) >= 75
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {percentage}%
                      </span>
                    </p>
                  </div>

                  <div className="d-flex gap-2 ms-auto">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => editAttendance(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteAttendance(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
