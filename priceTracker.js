const express = require("express");
const axios = require("axios"); // Install this with `npm install axios`
const cors = require("cors");
require("dotenv").config(); // Load API keys from `.env`

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS (Important for frontend to access this API)
app.use(cors());

// Route to fetch product price
app.get("/api/getPrice", async (req, res) => {
    try {
        const product = req.query.product;
        if (!product) {
            return res.status(400).json({ error: "Product name is required" });
        }

        // Example API - Replace this with a real API
        const apiUrl = `https://your-real-api.com/getPrice?product=${encodeURIComponent(product)}`;

        // Fetch real price from API
        const response = await axios.get(apiUrl, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.API_KEY}` // Use API Key if needed
            }
        });

        if (response.data.price) {
            return res.json({ price: response.data.price });
        } else {
            return res.status(500).json({ error: "Price not found" });
        }
    } catch (error) {
        console.error("Error fetching price:", error.message);
        res.status(500).json({ error: "Failed to fetch price" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
