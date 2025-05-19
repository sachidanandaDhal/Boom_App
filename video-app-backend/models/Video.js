const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  videoData: { type: Buffer, required: true },
  contentType: { type: String, required: true },
  thumbnailUrl: { type: String }, // optional
  likes: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now },
  isPublic: { type: Boolean, default: true },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
});


module.exports = mongoose.model('Video', videoSchema);
