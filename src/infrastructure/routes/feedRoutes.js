const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/upload', authMiddleware, feedController.uploadProof);
router.get('/:groupId', authMiddleware, feedController.getGroupFeed);

module.exports = router;