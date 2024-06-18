const Discussion = require('../models/Discussion');
const Comment = require('../models/Comment');
const Assignment = require('../models/Assignment')

const startDiscussion = async(req, res)=>{
    try{
        discuss  = new Discussion(req.body)
        discuss.assignment = req.params.assignmentId
        await discuss.save()
        let linkit = await Assignment.findById(req.params.assignmentId)
        linkit.discussions = discuss._id
        await linkit.save()
        res.send("New Discussion forum is created")
      }
    catch(error){
        console.error(`Create discussion error ${error}`)
    }
}

const getDiscussionByAssignment = async (req, res) => {
  try {
    const discussion = await Discussion.findOne({ assignment: req.params.assignmentId }).populate('comments');
    if (discussion){
      res.send(discussion);
    }
    else {
      res.send(null)
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllComments = async (req ,res)=>{

  try{
    const getAll = await Comment.find({}).populate("byUser")
    res.send(getAll)
  }
  catch(error)
  {
    res.status(500).json({ error: error.message });
  }
}
module.exports= {
  createDiscussion: startDiscussion,
  getDiscussionByAssignment,
  getAllComments
}