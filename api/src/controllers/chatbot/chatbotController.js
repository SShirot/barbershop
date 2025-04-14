const express = require('express');
const chatbotService = require('../../services/chatbotService');
const db = require('../../config/dbMysql');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const chatbotController = {
  handleChatMessage: async (req, res) => {
    try {
      const { message } = req.body;
      
      // Get user from authentication token
      let userId = null;
      let user = null;
      
      // Check if authorization header exists
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        
        try {
          // Verify token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          userId = decoded.user.id;
          
          // Get user data
          user = await User.findOneById(userId);
        } catch (error) {
          console.error('Token verification failed:', error);
          // Continue without user data if token is invalid
        }
      }
      
      // If no valid user, use a default ID
      if (!userId) {
        userId = 'guest-' + Date.now();
      }
      
      // Check if the message is asking for product details
      const productDetailRegex = /(?:tell me about|show me|details about|information about|what is|describe)\s+(?:the\s+)?(?:product\s+)?([^?.,]+)/i;
      const productMatch = message.match(productDetailRegex);
      
      if (productMatch) {
        const productName = productMatch[1].trim();
        
        // Search for the product in the database
        const query = `
          SELECT id, name, description, price, sale, status, avatar 
          FROM ec_products 
          WHERE name LIKE ? AND status = 'published'
          LIMIT 1
        `;
        
        const [products] = await db.query(query, [`%${productName}%`]);
        
        if (products.length > 0) {
          const product = products[0];
          const price = product.sale > 0 ? product.sale : product.price;
          const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
          
          // Clean HTML tags from description
          const cleanDescription = product.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
          
          // Create a detailed product response
          const productResponse = `
Product: ${product.name}
Price: ${formattedPrice}
Description: ${cleanDescription}
          `;
          
          // Send the product details to the chatbot for a more natural response
          const chat = await chatbotService.startChat(userId, user);
          const result = await chat.sendMessage(`Here is the product information: ${productResponse}. Please provide a natural response about this product.`);
          const response = await result.response;
          const text = await response.text();
          
          return res.json({ 
            reply: text,
            product: {
              id: product.id,
              name: product.name,
              price: price,
              avatar: product.avatar
            }
          });
        }
      }
      
      // If not a product-specific query, use the regular chatbot flow
      const chat = await chatbotService.startChat(userId, user);
      const response = await chatbotService.sendMessage(userId, message);

      res.json({ reply: response });
    } catch (error) {
      console.error('Error handling chat message:', error);
      res.status(500).json({ error: 'Failed to process message.' });
    }
  }
};

module.exports = chatbotController;
