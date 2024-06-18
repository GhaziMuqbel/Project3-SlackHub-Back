const express= require('express')
const router = express.Router()
const commentCtrl = require('../controllers/Comments')

router.post('/newcomment', commentCtrl.addComment )
router.get('/:commentId', commentCtrl.getComment)
router.put('/:commentId', commentCtrl.update)
router.put('/likes/:commentId', commentCtrl.likes)
router.delete('/:commentId', commentCtrl.delete)
module.exports= router