import apiHelper from '../api/apiHelper';

const apiChatbotService = {
  sendMessage: (userId, message, chatHistory = []) => {
    // Chuyển đổi định dạng chatHistory sang phù hợp với backend
    const formattedHistory = chatHistory.map((entry) => ({
      role: entry.sender === 'user' ? 'user' : 'model',
      parts: [{ text: entry.text }],
    }));

    return apiHelper.post('chatbot', { userId, message, chatHistory: formattedHistory });
  },
};

export default apiChatbotService;
