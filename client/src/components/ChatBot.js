import React, { useState } from 'react';
import './ChatBot.css';
import apiChatbotService from '../api/apiChatbot';

function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome! How can I help you?' },
  ]);
  const [input, setInput] = useState('');
  const userId = '12345'; // Replace with dynamic user ID if needed

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const response = await apiChatbotService.sendMessage(userId, input);
    console.log('Full Response from Backend:', response);
    
    console.log('Text box received:', input); // Log what textbox receives
  
    // Add user message to chat
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
  
    try {
      const payload = { userId, message: input };
      console.log('Payload sent to backend:', payload); // Log what is sent
  
      const response = await apiChatbotService.sendMessage(userId, input);
  
      // Safely access the response data
      const botReply = response?.data?.reply || 'Sorry, no reply received.';
      console.log('Response from backend:', botReply); // Log response received
  
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, something went wrong.' },
      ]);
    }
  };
  

  return (
    <div className="chatbot-container">
      {/* Header */}
      <div className="chatbot-header">
        <span>Chat with us!</span>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>

      {/* Chat Body */}
      <div className="chatbot-body">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
