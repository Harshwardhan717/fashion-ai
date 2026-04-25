const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "Please send a message." });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are an expert Indian fashion stylist for RadhikaShoppy. Recommend sarees and lehengas. Be polite and use emojis. 2 sentences max."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150,
    });

    const reply = completion.choices[0]?.message?.content || "Please try again!";
    res.json({ reply });

  } catch (error) {
    console.error("Groq Error:", error);
    res.status(500).json({ reply: "My styling brain is resetting. Please try again! 🙇‍♀️" });
  }
});

module.exports = router;