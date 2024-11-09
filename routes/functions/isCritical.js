import Patient from '../../models/Patient.js';
import PatientRecord from '../../models/PatientRecord.js';


// Endpoint to check if a patient is in critical condition
export async function isCritical(id) {


    // Check if the patient exists
    const patient = await Patient.findById(id);

    // Fetch the latest records for blood pressure and blood oxygen level
    const bloodPressureRecord = await PatientRecord.findOne({ patient: id, datatype: 'blood pressure' })
      .sort({ measurementDate: -1 });
    const bloodOxygenRecord = await PatientRecord.findOne({ patient: id, datatype: 'blood oxygen level' })
      .sort({ measurementDate: -1 });

    // Default to normal if no records are found
    let isCritical = false;

    // Check blood pressure
    if (bloodPressureRecord) {
      const bloodPressureValue = bloodPressureRecord.readingValue;
      if (bloodPressureValue < 60 || bloodPressureValue > 140) {
        isCritical = true;
      }
    }

    // Check blood oxygen level
    if (bloodOxygenRecord) {
      const bloodOxygenValue = bloodOxygenRecord.readingValue;
      if (bloodOxygenValue < 40 || bloodOxygenValue > 80) {
        isCritical = true;
      }
    }

    return isCritical
};