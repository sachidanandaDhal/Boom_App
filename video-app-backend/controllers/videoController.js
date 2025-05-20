const Video = require('../models/Video');

exports.uploadVideo = async (req, res) => {
  const { title } = req.body;
  const userId = req.user?.userId;

  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const video = await Video.create({
      user: userId,
      title,
      videoData: req.file.buffer,
      contentType: req.file.mimetype,
    });

    res.status(201).json({ message: 'Video uploaded', id: video._id });
  } catch (err) {
    console.error('Upload error:', err); // helpful log
    res.status(500).json({ error: 'Upload failed' });
  }
};


exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });

    const response = videos.map(video => ({
      _id: video._id,
      title: video.title,
      likes: video.likes,
      createdAt: video.createdAt,
      contentType: video.contentType,
      videoUrl: `/video/stream/${video._id}`, // streaming URL
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

exports.streamVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const range = req.headers.range;
    const videoBuffer = video.videoData;
    const videoSize = videoBuffer.length;

    if (!range) {
      res.writeHead(200, {
        'Content-Length': videoSize,
        'Content-Type': video.contentType,
      });
      return res.end(videoBuffer);
    }

    // Parse Range header
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;

    if (start >= videoSize || end >= videoSize) {
      res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + videoSize);
      return;
    }

    const chunkSize = end - start + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': video.contentType,
    });

    const videoChunk = videoBuffer.slice(start, end + 1);
    res.end(videoChunk);
  } catch (error) {
    console.error('Stream error:', error);
    res.status(500).json({ error: 'Failed to stream video' });
  }
};




exports.likeVideo = async (req, res) => {
   console.log('LikeVideo called with id:', req.params.id);
  try {
    const { id } = req.params;
    const { liked } = req.body; // expects boolean

    if (typeof liked !== 'boolean') {
      return res.status(400).json({ error: 'Missing or invalid "liked" boolean in request body' });
    }

    const increment = liked ? 1 : -1;

    // Update likes count atomically, ensure it doesn't go below zero
    const video = await Video.findByIdAndUpdate(
      id,
      { $inc: { likes: increment } },
      { new: true }
    );

    if (!video) return res.status(404).json({ error: 'Video not found' });

    // Optional: prevent negative likes
    if (video.likes < 0) {
      video.likes = 0;
      await video.save();
    }

    res.json({ success: true, likes: video.likes });
  } catch (error) {
    console.error('Error liking video:', error);
  
    res.status(500).json({ error: 'Failed to like/unlike video' });
  }
};



