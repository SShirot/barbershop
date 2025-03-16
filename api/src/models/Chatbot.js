// Ví dụ đơn giản, có thể thay bằng gọi API bên thứ ba hoặc database
exports.getBotReply = async (message) => {
    if (message.toLowerCase().includes('hello')) {
      return 'Hello! How can I help you?';
    }
    return "Sorry, I don't understand your question.";
  };
  