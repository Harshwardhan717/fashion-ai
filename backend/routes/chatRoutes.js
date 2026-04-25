const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Please send a message." });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-lite"
    });

    const result = await model.generateContent(`
      Instructions: You are an expert Indian fashion stylist for RadhikaShoppy. 
      Recommend sarees and lehengas. Be polite and use emojis. 2 sentences max.
      
      User: ${message}
    `);

    const response = await result.response;
    res.json({ reply: response.text() });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ reply: "My styling brain is resetting. Please try again! 🙇‍♀️" });
  }
});

module.exports = router;
module.exports = router;