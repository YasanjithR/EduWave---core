module.exports = {
  async up(db, client) {
    const learner = await db.collection('learners').insertOne({
      username: 'LearnerUsername',
      password: 'LearnerPassword',
      email: 'learner@example.com'
    });

    const course = await db.collection('courses').insertOne({
      title: 'Course Title',
      content: 'Course Content',
      instructor: 'superiorId', 
      videos: [
        {
          title: 'Video Title',
          url: 'https://example.com'
        }
      ],
      notes: [
        {
          title: 'Note Title',
          content: 'Note Content'
        }
      ],
      quizzes: [
        {
          question: 'Quiz Question',
          options: ['Option 1', 'Option 2', 'Option 3'],
          correct: 1
        }
      ],
      approved: true
    });

    await db.collection('enrollments').insertOne({
      course: course.insertedId,
      learner: learner.insertedId,
      progress: 0
    });
  },

  async down(db, client) {
    const enrollment = await db.collection('enrollments').findOne({ learner: 'learnerId', course: 'courseId' }); // replace with actual ObjectIds
    await db.collection('enrollments').deleteOne({ _id: enrollment._id });
    await db.collection('courses').deleteOne({ _id: enrollment.course });
    await db.collection('learners').deleteOne({ _id: enrollment.learner });
  },
};