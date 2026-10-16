import { useState } from "react";

const initialForm = { name: "", email: "", password: "", age: "" };

export default function Register() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function validate() {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = "Enter a valid email";
    if (!formData.password) nextErrors.password = "Password is required";
    else if (formData.password.length < 6) nextErrors.password = "Password must contain at least 6 characters";
    if (formData.age === "") nextErrors.age = "Age is required";
    else if (!Number.isFinite(Number(formData.age)) || Number(formData.age) < 18) nextErrors.age = "Age must be 18 or above";
    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setMessage("");
      return;
    }
    setErrors({});
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      setMessage(data.message);
      setFormData(initialForm);
    } catch (error) {
      setMessage(error.message || "Unable to connect to server");
    }
  }

  return (
    <main>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Name <input name="name" value={formData.name} onChange={handleChange} /></label>
        <p role="alert">{errors.name}</p>
        <label>Email <input name="email" type="email" value={formData.email} onChange={handleChange} /></label>
        <p role="alert">{errors.email}</p>
        <label>Password <input name="password" type="password" value={formData.password} onChange={handleChange} /></label>
        <p role="alert">{errors.password}</p>
        <label>Age <input name="age" type="number" value={formData.age} onChange={handleChange} /></label>
        <p role="alert">{errors.age}</p>
        <button type="submit">Register</button>
      </form>
      <p role="status">{message}</p>
    </main>
  );
}
