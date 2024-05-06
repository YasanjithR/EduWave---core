const express = require("express");
const cors = require("cors");
const learnerRoutes = require('./routes/learnerRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/user', learnerRoutes);
app.use('/enroll', enrollmentRoutes);

module.exports = app;
