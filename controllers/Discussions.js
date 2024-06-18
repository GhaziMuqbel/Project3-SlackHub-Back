const Discussion = require('../models/Discussion');
const Comment = require('../models/Comment');
const Assignment = require('../models/Assignment')

const startDiscussion = async(req, res)=>{
    try{
      let discuss = await Discussion.findById(req.params.assignmentId)

      if(discuss){
        res.send(discuss)
      }
      else {
        discuss  = new Discussion(req.body)
        discuss.assignment = req.params.assignmentId
        await discuss.save()
        let linkit = await Assignment.findById(req.params.assignmentId)
        linkit.discussions = discuss._id
        await linkit.save()
        res.send(discuss)
      }
    }
    catch(error){
        console.error(`Create discussion error ${error}`)
    }
}

const getDiscussionByAssignment = async (req, res) => {
  try {
    const discussion = await Discussion.findOne({ assignment: req.params.assignmentId }).populate('comments');
    res.send(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const addComment = async (req, res) => {
//   try {
//     const newComment = new Comment({ ...req.body, discussion: req.params.discussionId });
//     await newComment.save();
//     await Discussion.findByIdAndUpdate(req.params.discussionId, { $push: { comments: newComment._id } });
//     res.status(201).json(newComment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const deleteDiscussion= async(req, res)=>{
//     try{
//         const deleteIt = await findAndDelete()
//     }
//     catch(err){
//         console.err(`error in the deleteDiscussion ${err}`)
//     }
// }

module.exports= {
  createDiscussion: startDiscussion,
  getDiscussionByAssignment
}