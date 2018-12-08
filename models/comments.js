
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    comment: { type: String },
    image: { type: String },
    path: {type: String},
    user: {type: String}
  },{ versionKey: false });
  const commentModel = mongoose.model('comment', commentSchema);
