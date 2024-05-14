const axios = require('axios');

exports.sendSMS = async (req, res) => {
  const { to } = req.body;

  const message = req.body.message || 'You have successfully enrolled in a new course! Happy learning! ~ Team EduWave';

  try {
    const response = await axios.get(`https://app.notify.lk/api/v1/send`, {
      params: {
        user_id: process.env.USER_ID,
        api_key: process.env.API_KEY,
        sender_id: process.env.SENDER_ID,
        to,
        message
      }
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};