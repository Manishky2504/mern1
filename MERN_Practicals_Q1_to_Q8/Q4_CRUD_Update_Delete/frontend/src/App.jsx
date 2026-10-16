import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/student";
const emptyForm = { name: "", roll: "", course: "" };

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  async function fetchStudents() {
    try {
      const response = await axios.get(API);
      setStudents(response.data);
    } catch {
      setMessage("Unable to fetch students");
    }
  }
  useEffect(() => { fetchStudents(); }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = { ...form, roll: Number(form.roll) };
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, payload);
        setMessage("Student updated successfully");
      } else {
        await axios.post(API, payload);
        setMessage("Student added successfully");
      }
      setForm(emptyForm);
      setEditId(null);
      await fetchStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || "Operation failed");
    }
  }

  function editStudent(student) {
    setEditId(student._id);
    setForm({ name: student.name, roll: String(student.roll), course: student.course });
  }

  async function deleteStudent(id) {
    if (!window.confirm("Delete this student?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      if (editId === id) { setEditId(null); setForm(emptyForm); }
      setMessage("Student deleted successfully");
      await fetchStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to delete student");
    }
  }

  return (
    <main>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="roll" type="number" min="1" placeholder="Roll No." value={form.roll} onChange={handleChange} required />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
        <button type="submit">{editId ? "Update" : "Save"}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm(emptyForm); }}>Cancel</button>}
      </form>
      <p role="status">{message}</p>
      <h2>Student List</h2>
      {students.map((student) => (
        <div key={student._id}>
          {student.name} - {student.roll} - {student.course}{" "}
          <button onClick={() => editStudent(student)}>Edit</button>{" "}
          <button onClick={() => deleteStudent(student._id)}>Delete</button>
        </div>
      ))}
    </main>
  );
}
