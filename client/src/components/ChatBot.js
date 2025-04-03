import React, { useState, useEffect, useRef } from 'react';
import Typing from 'react-typing-animation';
import './ChatBot.css';
import apiChatbotService from '../api/apiChatbot';

function Chatbot({ onClose }) {
  const userId = '12345'; // Replace with dynamic user ID if needed

  // Ref for the chat body container
  const chatBodyRef = useRef(null);

  const loadMessages = () => {
    const savedMessages = sessionStorage.getItem('chat_history');
    if (savedMessages) {
      return JSON.parse(savedMessages).map((msg) => ({ ...msg, animated: false }));
    }
    return [{ sender: 'bot', text: 'Hello there! How can I help you today?', animated: false }];
  };

  const [messages, setMessages] = useState(loadMessages);
  const [input, setInput] = useState('');

  // Save messages to sessionStorage whenever messages state changes
  useEffect(() => {
    sessionStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    console.log('Sending data:', { userId, message: input, chatHistory: messages });
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);

    // Clear input immediately
    setInput('');

    try {
      const response = await apiChatbotService.sendMessage(userId, input);
      const botReply = response?.data?.reply || 'Sorry, no reply received.';
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply, animated: true }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, something went wrong.', animated: true },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <span>Chat with us!</span>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>

      {/* Chat Body with ref */}
      <div className="chatbot-body" ref={chatBodyRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-bubble ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
            {msg.sender === 'bot' && msg.animated ? (
              <TypingEffect text={msg.text} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: formatBotResponse(msg.text) }} />
            )}
          </div>
        ))}
      </div>

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

// TypingEffect component using react-typing-animation
function TypingEffect({ text }) {
  return (
    <Typing speed={0}>
      <span>{text}</span>
    </Typing>
  );
}

// Function to format bot responses into HTML
function formatBotResponse(responseText) {
  // Example of formatting logic for structured responses
  return responseText
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text (e.g., **bold**)
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text (e.g., *italic*)
    .replace(/\n/g, '<br>') // Line breaks
    .replace(/- (.*?)$/gm, '<li>$1</li>') // Bulleted lists (- item)
    .replace(/(\d+)\.\s(.*?)$/gm, '<li><strong>$1.</strong> $2</li>'); // Numbered lists (1. item)
}

export default Chatbot;
