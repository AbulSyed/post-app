const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post