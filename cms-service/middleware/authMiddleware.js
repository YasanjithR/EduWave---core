const jwt = require('jsonwebtoken');
const Superior = require('../models/superior');

exports.authenticateJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    const superior = await Superior.findById(decoded.id);
    if (!superior) return res.status(404).send('No superior found.');

    req.superior = superior;
    next();
  });
};

exports.isInstructor = (req, res, next) => {
  const role = req.headers['x-user-role'];
  if (role !== 'Instructor') {
    return res.status(403).send('Only instructors can perform this action.');
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  const role = req.headers['x-user-role'];
  if (role !== 'Admin') {
    return res.status(403).send('Only admins can perform this action.');
  }
  next();
};