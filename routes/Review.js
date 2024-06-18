const express = require('express')
const router = express.Router()
const review = require('../controllers/review')

router.post('/reviews', review.createReview)
router.get('/reviews/:id', review.getReviewById)
router.put('/reviews/:id', review.updateReview)
router.delete('/reviews/:id', review.deleteReview)

module.exports = router
