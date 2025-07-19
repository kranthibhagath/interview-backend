const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');


const authRoute = require('./routes/authRoutes');
const patientDataRoutes = require('./routes/patientDataRoutes');

const app = express();

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoute);
app.use('/api/patient-data', patientDataRoutes);

module.exports = app;