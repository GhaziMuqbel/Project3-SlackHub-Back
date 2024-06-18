const Comments = require('../models/Comment')

const addComment = async(req, res)=>{
    try{

        const newComment = new Comment (req.body)
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
        const update = await Comments.findById(req.params.commentId)
        update.comments = req.body.comments
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
        likeIt.likes+=1;
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