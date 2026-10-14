import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="card shadow-sm p-3">
      <h6 className="text-muted">{title}</h6>
      <h3>{value}</h3>
    </div>
  );
}

// import React from "react";

// export default function StatCard({ probs }) {
//   return (
//     <div className="card shadow-sm p-3">
//       <h6 className="text-muted">{probs.title}</h6>
//       <h3>{probs.value}</h3>
//     </div>
//   );
// }
