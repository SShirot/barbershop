import apiHelper from '../api/apiHelper';

const apiChatbotService = {
  sendMessage: (message, chatHistory = []) => {
    // Get auth token from localStorage
    const token = localStorage.getItem('token');
    
    // Chuyển đổi định dạng chatHistory sang phù hợp với backend
    const formattedHistory = chatHistory.map((entry) => ({
      role: entry.sender === 'user' ? 'user' : 'model',
      parts: [{ text: entry.text }],
    }));

    // Add authorization header if token exists
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    return apiHelper.post('chatbot', { message, chatHistory: formattedHistory }, headers);
  },
  
  // New method to get product recommendations
  getProductRecommendations: (preferences) => {
    // Get auth token from localStorage
    const token = localStorage.getItem('token');
    
    // Add authorization header if token exists
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    return apiHelper.post('chatbot', { 
      message: `Can you recommend products based on these preferences: ${preferences}?` 
    }, headers);
  },
  
  // New method to get product details
  getProductDetails: (productName) => {
    // Get auth token from localStorage
    const token = localStorage.getItem('token');
    
    // Add authorization header if token exists
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    return apiHelper.post('chatbot', { 
      message: `Tell me about the product ${productName}` 
    }, headers);
  }
};

export default apiChatbotService;
