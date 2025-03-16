import apiHelper from '../api/apiHelper';

const apiChatbotService = {
    sendMessage: (userId, message) => {
        return apiHelper.post('chatbot', { userId, message });
    },
};

export default apiChatbotService;
