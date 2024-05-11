const Superior = require('../models/superior');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const superior = new Superior({ username, password: bcrypt.hashSync(password, 8), email, role });
    await superior.save();
    console.log('User registered:', superior);
    res.status(201).send({ message: 'User registered successfully', user: superior });
  } catch (err) {
    console.log('Error registering:', err);
    res.status(500).send({ message: 'Error registering user', error: err});
  }
};

exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const superior = await Superior.findOne({ username });
      if (!superior || !bcrypt.compareSync(password, superior.password)) {
        return res.status(401).send('Invalid username or password');
      }
  
      const token = jwt.sign({ id: superior._id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });
  
      console.log('User logged in:', superior);
      res.status(200).send({ message: 'User logged in successfully', auth: true, token: token, email: superior.email });
    } catch (err) {
      console.log('Error logging in:', err);
      res.status(500).send({ message: 'Error logging in', error: err });
    }
  };