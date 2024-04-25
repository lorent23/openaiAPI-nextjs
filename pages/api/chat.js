// pages/api/chat.js
import axios from 'axios';
const OpenAI = require('openai');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { userQuery, url } = req.body;
      const { data } = await axios.get(url);
      const websiteContent = data; // Transform this as needed

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        prompt: `${websiteContent}\n\nUser asks: ${userQuery}\nAnswer:`,
        max_tokens: 150
      });

      res.status(200).json({ answer: aiResponse.data.choices[0].text.trim() });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Failed to process request');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
