import express from "express";
import Patient from "../models/Patient.js";
import { Authenticate } from "./functions/Authenticate.js";
import { isCritical } from "./functions/isCritical.js";

const router = express.Router();


// Get all patients
router.get("/", async (req, res) => {
    try {
      const authHeader = req.headers['auth']; // Access the "Auth" header
      if (!authHeader || !Authenticate(authHeader)) res.status(401).json({"message": "Unauthorized: Invalid authentication credentials."})
      const patients = await Patient.find();
      res.json(patients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Create a new patient
router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Get a patient by ID
router.get("/:id", async (req, res) => {
  console.log("received get");
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a patient by ID
router.put("/:id", async (req, res) => {
    try {
      console.log("received")
  
      const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      
      if (!patient) return res.status(404).json({ message: "Patient not found" });
      res.status(200).json(patient);
    } catch (error) {
      console.log("error")
      res.status(400).json({ message: error.message });
    }
  });
  


// Delete a patient by ID
router.delete("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
