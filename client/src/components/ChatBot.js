import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import apiChatbotService from '../api/apiChatbot';

function Chatbot({ onClose }) {
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
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    console.log('Sending data:', { message: input, chatHistory: messages });
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);

    // Clear input immediately
    setInput('');

    try {
      const response = await apiChatbotService.sendMessage(input, messages);
      const botReply = response?.data?.reply || 'Sorry, no reply received.';
      
      // Check if the response includes product information
      if (response?.data?.product) {
        setSelectedProduct(response.data.product);
        setMessages((prev) => [...prev, { 
          sender: 'bot', 
          text: botReply, 
          animated: false,
          product: response.data.product 
        }]);
      } else {
        setSelectedProduct(null);
        setMessages((prev) => [...prev, { sender: 'bot', text: botReply, animated: false }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, something went wrong.', animated: false },
      ]);
    }
  };

  // Function to handle product recommendation request
  const handleProductRecommendation = async (preferences) => {
    try {
      const response = await apiChatbotService.getProductRecommendations(preferences);
      const botReply = response?.data?.reply || 'Sorry, no recommendations available.';
      
      if (response?.data?.product) {
        setSelectedProduct(response.data.product);
        setMessages((prev) => [...prev, { 
          sender: 'bot', 
          text: botReply, 
          animated: false,
          product: response.data.product 
        }]);
      } else {
        setSelectedProduct(null);
        setMessages((prev) => [...prev, { sender: 'bot', text: botReply, animated: false }]);
      }
    } catch (error) {
      console.error('Error getting product recommendations:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, I could not find any recommendations.', animated: false },
      ]);
    }
  };

  // Function to handle product details request
  const handleProductDetails = async (productName) => {
    try {
      const response = await apiChatbotService.getProductDetails(productName);
      const botReply = response?.data?.reply || 'Sorry, no product details available.';
      
      if (response?.data?.product) {
        setSelectedProduct(response.data.product);
        setMessages((prev) => [...prev, { 
          sender: 'bot', 
          text: botReply, 
          animated: false,
          product: response.data.product 
        }]);
      } else {
        setSelectedProduct(null);
        setMessages((prev) => [...prev, { sender: 'bot', text: botReply, animated: false }]);
      }
    } catch (error) {
      console.error('Error getting product details:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, I could not find details for that product.', animated: false },
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
            <div dangerouslySetInnerHTML={{ __html: formatBotResponse(msg.text) }} />
            
            {/* Display product information if available */}
            {msg.product && (
              <div className="product-card">
                {msg.product.avatar && (
                  <div className="product-image">
                    <img src={msg.product.avatar} alt={msg.product.name} />
                  </div>
                )}
                <div className="product-info">
                  <h4>{msg.product.name}</h4>
                  <p className="product-price">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(msg.product.price)}
                  </p>
                  <button 
                    className="view-product-btn"
                    onClick={() => window.location.href = `/products/${msg.product.id}`}
                  >
                    View Product
                  </button>
                </div>
              </div>
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
