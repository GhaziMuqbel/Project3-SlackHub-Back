const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignment: { type: Schema.Types.ObjectId, ref: "Assignment", required: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;