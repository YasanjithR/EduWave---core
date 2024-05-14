const Learner = require('../models/learner');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, email, mobile, role } = req.body;
    const learner = new Learner({ username, password: bcrypt.hashSync(password, 8), email, mobile, role });
    await learner.save();
    console.log('User registered:', learner);
    res.status(201).send({ message: 'User registered successfully', user: learner });
  } catch (err) {
    console.log('Error registering:', err);
    res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const learner = await Learner.findOne({ username });
    if (!learner || !bcrypt.compareSync(password, learner.password)) {
      return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign({ id: learner._id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    console.log('User logged in:', learner);
    res.status(200).send({ message: 'User logged in successfully', auth: true, token: token, email: learner.email, role: 'learner', _id: learner._id, mobile: learner.mobile });
  } catch (err) {
    console.log('Error logging in:', err);
    res.status(500).send(err);
  }
};

exports.getLearner = async (req, res) => {
  try {
    const learner = await Learner.findById(req.params.id);
    if (!learner) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(learner);
  } catch (err) {
    console.log('Error getting user:', err);
    res.status(500).send(err);
  }
}