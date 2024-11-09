import express from 'express';
import PatientRecord from '../models/PatientRecord.js';

const router = express.Router();

// Create a new patient record
router.post('/', async (req, res) => {
  try {
    const patientRecord = new PatientRecord(req.body);
    await patientRecord.save();
    res.status(201).json(patientRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all patient records
router.get('/', async (req, res) => {
  try {
    const records = await PatientRecord.find().populate('patient');
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a patient record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await PatientRecord.findById(req.params.id).populate('patient');
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a patient record by ID
router.put('/:id', async (req, res) => {
  try {
    const record = await PatientRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a patient record by ID
router.delete('/:id', async (req, res) => {
  try {
    const record = await PatientRecord.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;