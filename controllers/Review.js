const Review = require('../models/Review')
const Assignment = require('../models/Assignment')

exports.createReview = async (req, res) => {
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

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('reviewer assignment')
    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' })
  }
}
