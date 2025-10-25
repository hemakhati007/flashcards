
const Deck = require('../Models/Deck');
const Flashcard = require('../Models/Flashcard');
require('dotenv').config(); // at the top

const { CohereClient } = require("cohere-ai");
const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

 

const generateDeck = async(req, res) => {
    
    const { title, prompt,count } = req.body;
    const userId = req.user.id;
    try {
      
        // 1. Call Cohere API to generate flashcards
        const cohereResponse = await cohere.chat({
            model: 'command-a-03-2025',
            message: `You are a helpful assistant. Please return exactly "${count}" flashcards as a valid JSON array. Each flashcard should have a "question" and an "answer". The output must be strictly in this format:

[
  {"question": "What is X?", "answer": "X is..."},
  ...
]

Topic: "${prompt}"`,
            temperature: 0.6,
        });

        const rawText = cohereResponse.text.trim();
        // console.log("🟡 Raw Cohere Output:\n", rawText);
        console.log("🟡 Raw Cohere Output:\n");

        

        let cleaned = rawText
            // Remove markdown code fences
            .replace(/```json|```/g, '')
            // Trim whitespace
            .trim();
        // 2. Try parsing the response directly as JSON
        let flashcardsData;

        try {
            // ✅ Try strict JSON parsing first
            flashcardsData = JSON.parse(cleaned);
            // console.log("✅ Parsed JSON flashcards:", flashcardsData);
            console.log("✅ Parsed JSON flashcards:");


             
        } catch (err) {
            console.warn("⚠️ JSON.parse failed. Trying fallback regex.");

            // 🛠 Fallback parsing
            flashcardsData = cleaned
                .split(/\n?\s*\{\s*"question"/)
                .slice(1)
                .map((chunk) => {
                    const question = chunk.match(/"question"\s*:\s*"([^"]+)"/)?.[1];
                    const answer = chunk.match(/"answer"\s*:\s*"([^"]+)"/)?.[1];
                    return { question, answer };
                })
                .filter((card) => card.question && card.answer);
            
            if (flashcardsData.length === 0) {
                return res.status(500).json({
                    success: false,
                    error: "Failed to parse flashcards from Cohere response.",
                });
            }
        }


        

        // 3. Return the flashcards
        res.status(201).json({
            success: true,
            flashcards: flashcardsData,
        });
 
    }
    catch (err) {
        console.error('Deck Generation Error:', err);
        res.status(500).json({ success: false, error: 'Server error' });
        
    }

}

module.exports ={ generateDeck};