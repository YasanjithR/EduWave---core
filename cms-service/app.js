const express = require("express");
const cors = require("cors");
const superiorRoutes = require('./routes/superiorRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/user', superiorRoutes);
app.use('/course', courseRoutes);

module.exports = app;
