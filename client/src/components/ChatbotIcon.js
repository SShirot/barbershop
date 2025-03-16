import React from 'react';
import './ChatbotIcon.css';

const ChatbotIcon = ({ onClick }) => {
  return (
    <div className="chatbot-icon" onClick={onClick}>
      💬
    </div>
  );
};

export default ChatbotIcon;
