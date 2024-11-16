// routes/item.js
const express = require("express");
const db = require("./db");
const router = express.Router();

// Get all items from MySQL database
router.get("/", (req, res) => {
  const sqlQuery = "SELECT * FROM users"; // Change 'items' to your table name

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).json({ message: "Error fetching data from MySQL" });
    } else {
      res.json(results); // Send the data as JSON response
    }
  });
});

module.exports = router;
