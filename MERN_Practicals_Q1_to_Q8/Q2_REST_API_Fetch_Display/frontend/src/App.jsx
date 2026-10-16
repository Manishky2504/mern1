import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/students";

export default function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(API)
      .then((response) => setStudents(response.data))
      .catch(() => setError("Could not load students. Check that the API is running."));
  }, []);

  return (
    <main>
      <h1>Student Management System</h1>
      <h2>Students List</h2>
      {error && <p role="alert">{error}</p>}
      {students.length === 0 && !error ? <p>Loading students...</p> : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>{student.name} - {student.course}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
