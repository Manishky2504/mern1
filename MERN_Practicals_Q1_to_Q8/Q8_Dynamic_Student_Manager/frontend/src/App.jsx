import { useEffect, useMemo, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

const API = "http://localhost:5000/api/students";

export default function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState("");

  async function fetchStudents() {
    try {
      const response = await fetch(API);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to fetch students");
      setStudents(data);
    } catch (error) {
      setMessage(error.message || "Unable to connect to server");
    }
  }

  useEffect(() => { fetchStudents(); }, []);

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return students;
    return students.filter((student) =>
      `${student.name} ${student.email} ${student.course} ${student.city}`
        .toLowerCase().includes(term)
    );
  }, [students, search]);

  async function saveStudent(studentData) {
    const editing = Boolean(editingStudent);
    const url = editing ? `${API}/${editingStudent._id}` : API;
    try {
      const response = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Save failed");
      setMessage(editing ? "Student updated successfully" : "Student added successfully");
      setEditingStudent(null);
      await fetchStudents();
    } catch (error) {
      setMessage(error.message || "Unable to save student");
    }
  }

  async function deleteStudent(id) {
    if (!window.confirm("Delete this student?")) return;
    try {
      const response = await fetch(`${API}/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete failed");
      if (editingStudent?._id === id) setEditingStudent(null);
      setMessage(data.message);
      await fetchStudents();
    } catch (error) {
      setMessage(error.message || "Unable to delete student");
    }
  }

  return (
    <main>
      <h1>Student Management</h1>
      <input
        type="search"
        placeholder="Search name, email, course or city"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <StudentForm
        onSave={saveStudent}
        editingStudent={editingStudent}
        onCancel={() => setEditingStudent(null)}
      />
      <p role="status">{message}</p>
      <StudentList
        students={filteredStudents}
        onEdit={setEditingStudent}
        onDelete={deleteStudent}
      />
    </main>
  );
}
