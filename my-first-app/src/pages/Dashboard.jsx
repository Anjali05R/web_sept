import React from "react";
import StatCard from "./../components/StatCard";
export default function Dashboard() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container flex-grow-1 py-5">
        <div className="row">
          <div className="col-md-4 mb-3">
            <StatCard title="Course" value="4%" />
          </div>

          <div className="col-md-4 mb-3">
            <StatCard title="Assignments" value="2 Pending%" />
          </div>

          <div className="col-md-4 mb-3">
            <StatCard title="Attendance" value="92%" />
          </div>
        </div>
      </main>
      
    </div>
  );
}
