const Review = require('../models/Review')
const Assignment = require('../models/Assignment')

const createReview = async (req, res) => {
  const { reviewer, assignment, content, rating } = req.body

  try {
    const assignmentExists = await Assignment.findById(assignment)
    if (!assignmentExists) {
      return res.status(404).json({ error: 'Assignment not found' })
    }

    const newReview = new Review({ reviewer, assignment, content, rating })
    await newReview.save()
    res.status(201).json(newReview)
  } catch (error) {
    res.status(500).json({ error: 'Error creating review' })
  }
}

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      'reviewer assignment'
    )
    if (!review) return res.status(404).json({ error: 'Review not found' })
    res.status(200).json(review)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching review' })
  }
}

const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).populate('reviewer assignment')
    if (!review) return res.status(404).json({ error: 'Review not found' })
    res.status(200).json(review)
  } catch (error) {
    res.status(500).json({ error: 'Error updating review' })
  }
}

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id)
    if (!review) return res.status(404).json({ error: 'Review not found' })
    res.status(200).json({ message: 'Review deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting review' })
  }
}
module.exports = {
  createReview,
  getReviewById,
  updateReview,
  delete: deleteReview
}
