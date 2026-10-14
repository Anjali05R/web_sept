const courses = [
  { id: 1, name: "HTML and CSS", teacher: "Ravi Kumar" },
  { id: 2, name: "JavaScript", teacher: "Meena Iyer" },
  { id: 3, name: "React", teacher: "Arjun Das" },
  { id: 4, name: "Node and Express", teacher: "Priya Nair" },
];

function Courses() {
  return (
    <>
      <h2 className="mb-4">Courses</h2>

      <div className="row">
        {courses.map((course) => (
          <div className="col-md-6 mb-3" key={course.id}>
            <div className="card shadow-sm p-3">
              <h5>{course.name}</h5>
              <p className="text-muted mb-0">Teacher: {course.teacher}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Courses;