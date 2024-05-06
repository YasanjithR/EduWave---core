const Superior = require('../models/superior');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const superior = new Superior({ username, password: bcrypt.hashSync(password, 8), email, role });
    await superior.save();
    console.log('User registered:', superior);
    res.status(201).send(superior);
  } catch (err) {
    console.log('Error registering:', err);
    res.status(500).send(err);
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
      res.status(200).send({ auth: true, token: token });
    } catch (err) {
      console.log('Error logging in:', err);
      res.status(500).send(err);
    }
  };