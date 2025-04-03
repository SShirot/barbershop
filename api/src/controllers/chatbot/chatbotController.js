const express = require('express');
const chatbotService = require('../../services/chatbotService');

const chatbotController = {
  handleChatMessage: async (req, res) => {
    try {
      const { userId, message } = req.body;
      const chat = await chatbotService.startChat(userId);
      const response = await chatbotService.sendMessage(userId, message);

      res.json({ reply: response });
    } catch (error) {
      console.error('Error handling chat message:', error);
      res.status(500).json({ error: 'Failed to process message.' });
    }
  }
};

module.exports = chatbotController;
