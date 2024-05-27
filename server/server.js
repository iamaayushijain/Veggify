import express from 'express';
import { Marked, marked } from 'marked';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'; // Load environment variables from .env file

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// SSE Endpoint
app.get("/recipestream", (req, res) => {
  const ingredients = req.query.ingredients;
  const mealType = req.query.mealType;
  const cuisine = req.query.cuisine;
  const cookingTime = req.query.cookingTime;
  const complexity = req.query.complexity;

  console.log(req.query);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Function to send the entire response
  const sendEvent = (response) => {
    console.log(response);
    res.send(response);
  };

  const prompt = [];
  prompt.push("Generate a recipe that incorporates the following details:");
  prompt.push(`[Ingredients: ${ingredients}]`);
  prompt.push(`[Meal Type: ${mealType}]`);
  prompt.push(`[Cuisine Preference: ${cuisine}]`);
  prompt.push(`[Cooking Time: ${cookingTime}]`);
  prompt.push(`[Complexity: ${complexity}]`);
  prompt.push(
    "Please provide a detailed recipe, including steps for preparation and cooking. Only use the ingredients provided."
  );
  prompt.push(
    "The recipe should highlight the fresh and vibrant flavors of the ingredients."
  );
  prompt.push(
    "Also give the recipe a suitable name in its local language based on cuisine preference."
  );

  run(prompt, sendEvent);
  console.log("hello")

  req.on("close", () => {
    res.end();
  });
});

// const API_KEY = process.env.GOOGLE_API_KEY; // Ensure your API key is stored in an environment variable
const genAI = new GoogleGenerativeAI('AIzaSyCcCUM1I-ng-922QVpQtu1w75-wh7SdoRA');

async function run(prompt, callback) {
  try {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(prompt);
    
    const response = result.response;
    if (response && response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
      const generatedText = marked(response.candidates[0].content.parts.map(part => part.text).join("\n"));
      console.log("Generated Text:", generatedText);
      callback(generatedText);  // Send the generated text to the client
    } else {
      console.log("No valid response structure found.");
    }
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});