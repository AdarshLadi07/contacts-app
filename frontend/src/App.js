import React, { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:5000/contacts");
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    fetchContacts();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Contact Form</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br /><br />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br /><br />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required /><br /><br />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} /><br /><br />
        <button type="submit">Save</button>
      </form>

      <hr />

      <h3>Saved Contacts</h3>
      <ul>
        {contacts.map((c) => (
          <li key={c._id}>
            {c.name} - {c.email} - {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
