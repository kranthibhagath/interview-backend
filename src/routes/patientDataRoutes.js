const express = require('express');
const router = express.Router();
const patientDataController = require('../controllers/patientDataController');

router.post('/patients', patientDataController.createPatientData);
router.get('/patients/:userId', patientDataController.getPatientDataByUser);

module.exports = router;