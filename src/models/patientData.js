const mongoose = require('mongoose');

const patientDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: Number, required: true }, // in years
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    healthGoal: { type: String, required: true }, // e.g., "Weight loss", "Muscle gain"
    height: { type: Number, required: true }, // in centimeters
    weight: { type: Number, required: true }, // in kilograms
    diet: { type: String, required: true }, // e.g., "Balanced", "High protein"
    activityLevel: { type: String, enum: ['Sedentary', 'Lightly active', 'Moderately active', 'Very active'], required: true },
    bmi: { type: Number }, // calculated BMI value
    bmiCategory: { 
        type: String, 
        enum: ['Underweight', 'Normal weight', 'Overweight', 'Obesity class I', 'Obesity class II', 'Obesity class III'] 
    },
    calculationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PatientData', patientDataSchema);