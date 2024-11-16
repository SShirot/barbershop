const express = require("express");
const swaggerSetup = require("./config/swagger");
require("dotenv").config(); // Load environment variables
const cors = require("cors");
const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors()); // Thêm dòng này

// Define Routes
app.use("/api/v1", require("./routes"));
app.use("/api/v1/uploads", require("./routes/base/upload"));
app.use("/uploads/images", express.static("uploads/images"));
app.use("/api/orders", require("./routes/user/order"));
app.use("/api/items", require("./item"));

// Setup Swagger
swaggerSetup(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
