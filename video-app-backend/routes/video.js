const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const authenticateUser = require('../middleware/auth');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', authenticateUser, upload.single('video'), videoController.uploadVideo);
router.get('/', videoController.getVideos);
router.get('/stream/:id', videoController.streamVideo);
router.post('/like/:id', authenticateUser, videoController.likeVideo);
// other routes...

module.exports = router;
