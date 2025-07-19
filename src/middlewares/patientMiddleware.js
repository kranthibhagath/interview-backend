function calculateBMI(weight, height) {
    // BMI formula: weight (kg) / (height in meters)^2
    const heightInMeters = height / 100;
    return +(weight / (heightInMeters * heightInMeters)).toFixed(2);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 25) return 'Normal weight';
    if (bmi >= 25 && bmi < 30) return 'Overweight';
    if (bmi >= 30 && bmi < 35) return 'Obesity class I';
    if (bmi >= 35 && bmi < 40) return 'Obesity class II';
    return 'Obesity class III';
}

module.exports = function patientDataMiddleware(schema) {
    schema.pre('save', function (next) {
        this.bmi = calculateBMI(this.weight, this.height);
        this.bmiCategory = getBMICategory(this.bmi);
        next();
    });
};
