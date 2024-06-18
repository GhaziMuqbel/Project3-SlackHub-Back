const Comments = require('../models/Comment')
const Discussion = require('../models/Discussion')


const addComment = async(req, res)=>{
    const discussion = req.params.discussionId
    const userId= req.params.userId
    try{
        const getassignment = await Discussion.findById(discussion)
        const assignmentId = getassignment.assignment
        const newComment = new Comments (req.body)
        newComment.Discussion = discussion
        newComment.byUser = userId
        newComment.Assignment = assignmentId
        await newComment.save()

        res.send(newComment)
    }catch(err){
        console.error('error in addcomment '+ err)
    }
}
const getComment = async (req, res)=>{
    try{
        const comment = await Comments.findById(req.params.commentId)
        if(comment)
        {
            res.send(comment)
        }
        else {
            console.log(`No comment Found`)
        }
    }
    catch(err){
        console.error(`error in getComment ${err}`)
    }
}
const updateComment = async (req, res)=>{
    try{
        const update = await Comments.findByIdAndUpdate(req.params.commentId, req.body)
        if (req.body.comments){
        update.comments = req.body.comments}
        else {
            update.comments = update.comments 
        }
        if (req.body.likes){
            update.likes = req.body.likess}
            else {
                update.likes = update.likes 
            }
       
        await update.save()
        res.send(update)
    }
    catch(err){
        console.error(`error in the updateComment ${err}`)
    }
}

const deleteComment = async(req, res)=>{
    try{
        const deleteIt = await Comments.findAndDelete(req.params.commentId)
    }
    catch(err){
        console.error(`error in the deletion ${err}`)
    }
}
const increaseLikes = async(req, res)=>{
    try{
        const likeIt = await Comments.findById(req.params.commentId)
        likeIt.likes=likeIt.likes+1;
        await likeIt.save()
        res.send(likeIt)
    }
    catch(err){
        console.error(`error in increaseLikes func ${err}`)
    }
}


module.exports = {
    addComment,
    getComment,
    update: updateComment,
    delete: deleteComment,
    likes: increaseLikes

}