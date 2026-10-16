import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/student";

export default function App() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  async function fetchStudents() {
    try {
      const response = await axios.get(API);
      setStudents(response.data);
    } catch {
      setMessage("Could not fetch students. Check the backend and MongoDB.");
    }
  }

  useEffect(() => { fetchStudents(); }, []);

  async function addStudent(event) {
    event.preventDefault();
    try {
      await axios.post(API, { name, roll: Number(roll), course });
      setName("");
      setRoll("");
      setCourse("");
      setMessage("Student added successfully");
      await fetchStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to add student");
    }
  }

  return (
    <main>
      <h2>Student Registration</h2>
      <form onSubmit={addStudent}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Roll No." type="number" min="1" value={roll} onChange={(e) => setRoll(e.target.value)} required />
        <input placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} required />
        <button type="submit">Save</button>
      </form>
      <p role="status">{message}</p>
      <h2>Student List</h2>
      <ul>{students.map((student) => (
        <li key={student._id}>{student.name} - {student.roll} - {student.course}</li>
      ))}</ul>
    </main>
  );
}
