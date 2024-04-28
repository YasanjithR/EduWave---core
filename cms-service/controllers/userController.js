const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const user = new User({ username, password: bcrypt.hashSync(password, 8), email, role });
    await user.save();
    console.log('User registered:', user);
    res.status(201).send(user);
  } catch (err) {
    console.log('Error registering:', err);
    res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send('Invalid username or password');
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });
  
      console.log('User logged in:', user);
      res.status(200).send({ auth: true, token: token });
    } catch (err) {
      console.log('Error logging in:', err);
      res.status(500).send(err);
    }
  };