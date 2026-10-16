import { useEffect, useState } from "react";

const emptyForm = { name: "", email: "", course: "", city: "" };

export default function StudentForm({ onSave, editingStudent, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        email: editingStudent.email,
        course: editingStudent.course,
        city: editingStudent.city
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingStudent]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="course" placeholder="Course" value={formData.course} onChange={handleChange} required />
      <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
      <button type="submit">{editingStudent ? "Update Student" : "Add Student"}</button>
      {editingStudent && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
