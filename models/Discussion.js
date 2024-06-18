const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
  assignment: { type: Schema.Types.ObjectId, ref: 'Assignment' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const Discussion = mongoose.model('Discussion', discussionSchema);
module.exports = Discussion;