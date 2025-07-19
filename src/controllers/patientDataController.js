const bcrypt = require('bcryptjs');
const jwtHelper = require('../utils/jwt'); 

const PatientData = require('../models/patientData');
const User = require('../models/users');

// Create patient data
exports.createPatientData = async (req, res) => {
    console.log('Creating patient data:', req.body);
    const { userId } = req.body;
    try {
         const user = await PatientData.findOne({ userId });
        console.log('User data:', user);
        if (user){
            const patientData = await PatientData.updateOne({ userId }, req.body);
            return res.status(200).json({ message: 'Patient data updated successfully', data: patientData });
        }
        const patientData = new PatientData(req.body);
        await patientData.save();
        res.status(201).json(patientData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all records for a user
exports.getPatientDataByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const records = await PatientData.find({ userId }).sort({ calculationDate: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};