// routes/supportBot.js
import express from "express";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config(); // ← ensure .env is loaded in THIS module

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY, // now it's defined
    });

    const { messages } = req.body;

    const systemPrompt =
      "You are Pegasus MedFlight's support assistant. Help users with deliveries, " +
      "cold chain issues, and dashboard usage. If it's an emergency, tell them to call 1-800-PEGA-911.";

    const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [{ role: "system", content: systemPrompt }, ...messages],
  temperature: 0.3,
  max_tokens: 512,
});


    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("supportBot error:", err);
    res.json({
      reply: "Support is temporarily unavailable. Please try again.",
    });
  }
});

export default router;
