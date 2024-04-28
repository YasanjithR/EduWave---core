const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send('No user found.');

    req.user = user;
    next();
  });
};

exports.isInstructor = (req, res, next) => {
  if (req.user.role !== 'Instructor') {
    return res.status(403).send('Only instructors can perform this action.');
  }
  next();
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
      return res.status(403).send('Only admins can perform this action.');
    }
    next();
};