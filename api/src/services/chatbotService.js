const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require('../config/dbMysql');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatSessions = new Map();

// Function to fetch products from the database
const fetchProducts = async (limit = null) => {
  try {
    let query = `
      SELECT id, name, description, price, sale, status, avatar 
      FROM ec_products 
      WHERE status = 'published' 
      ORDER BY created_at DESC
    `;
    
    // Only add LIMIT clause if a limit is specified
    if (limit !== null) {
      query += ` LIMIT ?`;
      const [products] = await db.query(query, [limit]);
      return products;
    } else {
      const [products] = await db.query(query);
      return products;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Function to fetch user's order history
const fetchUserOrderHistory = async (userId) => {
  try {
    const query = `
      SELECT o.id, o.created_at, o.total_amount, o.status
      FROM orders o
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
      LIMIT 5
    `;
    const [orders] = await db.query(query, [userId]);
    return orders;
  } catch (error) {
    console.error('Error fetching user order history:', error);
    return [];
  }
};

// Function to fetch user's favorite products
const fetchUserFavoriteProducts = async (userId) => {
  try {
    const query = `
      SELECT p.id, p.name, p.price, p.sale, p.avatar
      FROM ec_products p
      JOIN user_favorites uf ON p.id = uf.product_id
      WHERE uf.user_id = ?
      LIMIT 5
    `;
    const [favorites] = await db.query(query, [userId]);
    return favorites;
  } catch (error) {
    console.error('Error fetching user favorite products:', error);
    return [];
  }
};

// Function to create a product context for the AI
const createProductContext = (products) => {
  if (!products || products.length === 0) {
    return "No products available.";
  }
  
  let context = "Here are the available products:\n\n";
  
  products.forEach((product, index) => {
    const price = product.sale > 0 ? product.sale : product.price;
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    
    context += `${index + 1}. ${product.name} - ${formattedPrice}\n`;
    if (product.description) {
      // Clean HTML tags from description
      const cleanDescription = product.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      context += `   Description: ${cleanDescription.substring(0, 150)}${cleanDescription.length > 150 ? '...' : ''}\n`;
    }
    context += '\n';
  });
  
  return context;
};

// Function to create a user context for the AI
const createUserContext = (user, orders, favorites) => {
  if (!user) {
    return "This is a guest user.";
  }
  
  let context = `User Information:\n`;
  context += `Name: ${user.name}\n`;
  context += `Email: ${user.email}\n`;
  
  if (user.phone) {
    context += `Phone: ${user.phone}\n`;
  }
  
  if (orders && orders.length > 0) {
    context += `\nRecent Orders:\n`;
    orders.forEach((order, index) => {
      const orderDate = new Date(order.created_at).toLocaleDateString();
      const orderStatus = order.status || 'Unknown';
      const orderAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total_amount);
      
      context += `${index + 1}. Order #${order.id} - ${orderDate} - ${orderAmount} - Status: ${orderStatus}\n`;
    });
  }
  
  if (favorites && favorites.length > 0) {
    context += `\nFavorite Products:\n`;
    favorites.forEach((product, index) => {
      const price = product.sale > 0 ? product.sale : product.price;
      const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      
      context += `${index + 1}. ${product.name} - ${formattedPrice}\n`;
    });
  }
  
  return context;
};

const chatbotService = {
  startChat: async (userId, user = null) => {
    if (!chatSessions.has(userId)) {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        },
      });
      
      // Fetch all products for context
      const products = await fetchProducts();
      const productContext = createProductContext(products);
      
      // Fetch user data if available
      let userContext = "This is a guest user.";
      if (user && user.id) {
        const orders = await fetchUserOrderHistory(user.id);
        const favorites = await fetchUserFavoriteProducts(user.id);
        userContext = createUserContext(user, orders, favorites);
      }
      
      const systemPrompt = `
You are a helpful product recommendation assistant for a barbershop/hair care store. 
You have access to the following information:

${userContext}

${productContext}

Your role is to:
1. Help customers find products based on their needs
2. Provide information about specific products
3. Make personalized recommendations based on customer preferences and history
4. Answer questions about hair care and products
5. If the user is logged in, use their information to provide more personalized recommendations

Always be friendly, professional, and helpful. If you don't have information about a specific product, be honest about it.
`;

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello, I'm looking for hair care products." }],
          },
          {
            role: "model",
            parts: [{ text: systemPrompt }],
          }
        ],
        generationConfig: {
          maxOutputTokens: 1000,
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
