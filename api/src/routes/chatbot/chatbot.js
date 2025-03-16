const express = require('express');
const router = express.Router();
const chatbotController = require('../../controllers/chatbot/chatbotController');

// Endpoint chatbot
router.post('/', chatbotController.handleChatMessage);

module.exports = router;