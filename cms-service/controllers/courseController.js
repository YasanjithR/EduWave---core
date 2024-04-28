const Course = require('../models/course')

exports.addCourse = async (req, res) => {
    const course = new Course({ ...req.body, approved: false });
    await course.save();
    res.status(201).send(course);
  };
  
  exports.updateCourse = async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (req.body.title) course.title = req.body.title;
      if (req.body.content) course.content = req.body.content;
      if (req.body.instructor) course.instructor = req.body.instructor;
      if (req.body.videos) course.videos = req.body.videos;
      if (req.body.notes) course.notes = req.body.notes;
      if (req.body.quizzes) course.quizzes = req.body.quizzes;
      course.approved = false;
      await course.save();
      res.status(200).send(course);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while updating the course."
      });
    }
  };

exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

exports.approveCourse = async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      course.approved = true;
      await course.save();
      res.status(200).send(course);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while approving the course."
      });
    }
};

exports.getCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404).send('Course not found');
    }
    res.status(200).send(course);
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).send(courses);
      } catch (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving the courses."
        });
    }
}