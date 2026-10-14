import { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Asha Verma",
    email: "asha@example.com",
    phone: "9876543210",
    city: "Pune",
  });
  const [editing, setEditing] = useState(false);

  function handleChange(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  }

  return (
    <div className="card shadow-sm p-4 col-md-6">
      <h2 className="mb-4">Profile</h2>

      <label className="form-label">Name</label>
      <input name="name" className="form-control mb-3" value={profile.name} onChange={handleChange} disabled={!editing} />

      <label className="form-label">Email</label>
      <input name="email" className="form-control mb-3" value={profile.email} onChange={handleChange} disabled={!editing} />

      <label className="form-label">Phone</label>
      <input name="phone" className="form-control mb-3" value={profile.phone} onChange={handleChange} disabled={!editing} />

      <label className="form-label">City</label>
      <input name="city" className="form-control mb-4" value={profile.city} onChange={handleChange} disabled={!editing} />

      {editing ? (
        <button className="btn btn-success" onClick={() => setEditing(false)}>Save</button>
      ) : (
        <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit</button>
      )}
    </div>
  );
}

export default Profile;