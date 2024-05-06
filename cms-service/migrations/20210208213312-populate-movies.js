module.exports = {
  async up(db, client) {
    const superior = await db.collection('superiors').insertOne({
      username: 'SuperiorUsername',
      password: 'SuperiorPassword',
      email: 'superior@example.com',
      role: 'instructor'
    });

    await db.collection('courses').insertOne({
      title: 'Course Title',
      content: 'Course Content',
      instructor: superior.insertedId,
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
      approved: false
    });
  },

  async down(db, client) {
    const course = await db.collection('courses').findOne({ title: 'Course Title' });
    await db.collection('courses').deleteOne({ _id: course._id });
    await db.collection('superiors').deleteOne({ _id: course.instructor });
  },
};