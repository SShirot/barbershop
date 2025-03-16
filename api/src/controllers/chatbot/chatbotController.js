const chatbotService = require('../../services/chatbotService');

exports.handleChatMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const botReply = await chatbotService.getBotResponse(message);
    res.json({ reply: botReply });
  } catch (error) {
    console.error('Error handling chatbot message:', error);
    res.status(500).json({ error: 'Failed to process message.' });
  }
};
