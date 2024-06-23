const Assignment = require('../models/Assignment')
const Courses = require('../models/Course')
const UploadAssignment = require('../models/UploadAssigment')

const create = async (req, res) => {
  const CourseID = req.params.courseId;
  console.log(`request body title: ${req.body.title}`);
  console.log(`requested file: ${JSON.stringify(req.file)}`);

  try {
    // Log incoming request body and file details
    console.log('Creating an assignment with data:', req.body);
    
    // Validate request body
    if (!req.body.title || !req.body.description) {
      return res.status(400).send({ message: 'Title and Description are required' });
    }

    const assignment = new Assignment(req.body);
    assignment.course = CourseID;

    if (req.file) {
      console.log('File found, processing upload...');
      const assign = new UploadAssignment({
        pdf: req.file.filename
      });
      const savedAssign = await assign.save();
      assignment.assignfile = savedAssign._id;
    }

    await assignment.save();

    const updateCourse = await Courses.findById(CourseID);
    if (!updateCourse) {
      return res.status(404).send({ message: 'Course not found' });
    }

    updateCourse.Assignments.push(assignment._id);
    await updateCourse.save();

    res.status(201).send(assignment);
  } catch (error) {
    console.error('Error occurred while creating assignment:', error);
    res.status(500).send({ message: 'An error occurred while creating the assignment', error: error.message });
  }
};


const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
};

const download = (req, res) => {
  //const filePath = path.join(__dirname, '../uploads', req.params.fileName)
  res.download(filePath)
}


const getAssignmentDetail = async (req, res) => {
  try {
    const getIt = await Assignment.findById(req.params.assignId).populate(
      'discussions'
    ).populate('assignfile')
    console.log(getIt)
    res.send(getIt)
  } catch (err) {
    console.error(`error in the get assignment detail ${err}`);
  }
};

module.exports = {
  create,
  download,
  delete: deleteAssignment,
  getAssignmentDetail
};

