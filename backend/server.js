const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./models/Contact");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const MONGO_URI =
  "mongodb+srv://adarshladi07_db_user:Naruto2005@cluster0.ahi4m2z.mongodb.net/contactsDB";

//  Connect MongoDB FIRST, then start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

//  Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

//  GET contacts (NO failure now)
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json([]);
  }
});

//  POST contact
app.post("/contacts", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: "Save failed" });
  }
});
