const Enrollment = require('../models/enrollment');

exports.enroll = async (req, res) => {
  try {
    const enrollment = new Enrollment({ learner: req.learner._id, course: req.params.id, progress: 0 });
    await enrollment.save();
    res.status(201).send({ message: 'Enrolled in course successfully', enrollment: enrollment });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while enrolling in the course."
    });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({ learner: req.learner._id, course: req.params.id });
    if (!enrollment) {
      res.status(404).send('Enrollment not found');
    }
    enrollment.progress = req.body.progress;
    await enrollment.save();
    res.status(200).send({ message: 'Progress updated successfully', enrollment: enrollment });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while updating the progress."
    });
  }
};

exports.seeProgress = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({ learner: req.learner._id, course: req.params.id });
    if (!enrollment) {
      res.status(404).send('Enrollment not found');
    }
    res.status(200).send({ message: 'Progress retrieved successfully', progress: enrollment.progress });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving the progress."
    });
  }
};

exports.seeAllprogress = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ learner: req.learner._id });
    res.status(200).send({ message: 'Progress retrieved successfully', courses: enrollments });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving the progress."
    });
  }
};