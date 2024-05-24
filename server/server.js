import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'// Load environment variables from .env file




const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// SSE Endpoint
app.get("/recipeStream", (req, res) => {
  const ingredients = req.query.ingredients;
  const mealType = req.query.mealType;
  const cuisine = req.query.cuisine;
  const cookingTime = req.query.cookingTime;
  const complexity = req.query.complexity;

  console.log(req.query)

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Function to send messages

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
    "Also give the recipe a suiable name in its local languagebased on cuisine preference."
  );

  
  run(prompt);

  // Clear interval and close connection on client disconnect
  req.on("close", () => {
    res.end();
  });
});

const API_KEY = 'AIzaSyCcCUM1I-ng-922QVpQtu1w75-wh7SdoRA';
const genAI = new GoogleGenerativeAI(API_KEY);

async function run(prompt) {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});