const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  Discussion: { type: Schema.Types.ObjectId, ref: 'Discussion' },
  Assignment:{type: Schema.Types.ObjectId, ref: 'Assignment'},
  byUser: {type: Schema.Types.ObjectId, ref: 'User'},
  comments: {
    type: String,
    required: true
  },
  likes:{
    type: Number
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;