const Course = require('../models/course')
const Instructor = require('../models/superior')

exports.addCourse = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ email: req.body.email });
    if (!instructor) {
      return res.status(404).send({ message: 'Instructor not found' });
    }
    const course = new Course({ ...req.body, instructor: instructor._id, approved: false });
    await course.save();
    res.status(201).send({ message: 'Course added successfully', course: course });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred', error: error });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }

    if (req.body.title) course.title = req.body.title;
    if (req.body.content) course.content = req.body.content;
    if (req.body.videos) course.videos = req.body.videos;
    if (req.body.notes) course.notes = req.body.notes;
    if (req.body.quizzes) course.quizzes = req.body.quizzes;

    if (req.body.instructor) {
      const instructor = await Instructor.findOne({ email: req.body.instructor });
      if (!instructor) {
        return res.status(404).send({ message: 'Instructor not found' });
      }
      course.instructor = instructor._id;
    }

    course.approved = false;
    await course.save();
    res.status(200).send({ message: 'Course updated successfully', course: course });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while updating the course."
    });
  }
};

exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(204).send({ message: 'Course deleted successfully' });
};

exports.approveCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    course.approved = true;
    await course.save();
    res.status(200).send({ message: 'Course approved successfully', course: course });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while approving the course."
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'username -_id');
    if (!course) {
      return res.status(404).send('Course not found');
    }
    res.status(200).send({ message: 'Course retrieved successfully', course: course });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving the course."
    });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'username -_id');
    res.status(200).send({ message: 'Courses retrieved successfully', courses: courses });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving the courses."
    });
  }
};