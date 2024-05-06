const jwt = require('jsonwebtoken');
const Learner = require('../models/learner');

exports.authenticateJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    const learner = await Learner.findById(decoded.id);
    if (!learner) return res.status(404).send('No learner found.');

    req.learner = learner;
    next();
  });
};