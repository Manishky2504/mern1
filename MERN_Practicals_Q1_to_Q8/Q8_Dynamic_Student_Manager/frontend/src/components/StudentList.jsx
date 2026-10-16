export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="8" cellSpacing="0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length === 0 ? (
          <tr><td colSpan="5">No records found</td></tr>
        ) : students.map((student) => (
          <tr key={student._id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.course}</td>
            <td>{student.city}</td>
            <td>
              <button type="button" onClick={() => onEdit(student)}>Edit</button>{" "}
              <button type="button" onClick={() => onDelete(student._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
