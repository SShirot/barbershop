const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatSessions = new Map();

const chatbotService = {
  startChat: async (userId) => {
    if (!chatSessions.has(userId)) {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        },
      });
      
      const chat = model.startChat({
        history: [], // Start with an empty history
        generationConfig: {
          maxOutputTokens: 500,
        },
      });
      chatSessions.set(userId, chat);
    }
    return chatSessions.get(userId);
  },

  sendMessage: async (userId, message) => {
    const chat = chatSessions.get(userId);
    if (!chat) {
      throw new Error("Chat session not found.");
    }

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = await response.text();
    return text;
  }
};

module.exports = chatbotService;
