const { GoogleGenerativeAI } = require("@google/generative-ai");

// Khởi tạo Gemini với API key từ file .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Cấu hình model Gemini
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

// Hàm gửi tin nhắn tới Gemini và nhận phản hồi
exports.getBotResponse = async (message) => {
  try {
    const chatSession = model.startChat();
    const result = await chatSession.sendMessage(message);
    const botReply = result.response.text();
    return botReply;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
