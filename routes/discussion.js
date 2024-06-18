const express = require('express')
const router = express.Router()
const discussionController= require('../controllers/Discussions')


router.get('/assignment/:assignmentId', discussionController.getDiscussionByAssignment);
router.post('/newdiscussion/:assignmentId', discussionController.createDiscussion);

module.exports = router