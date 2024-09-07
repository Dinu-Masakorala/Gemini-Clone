// eslint-disable-next-line no-unused-vars
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Declare the API key directly
const apiKey = "YOUR GOODLE GENERATIVE API KEY";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    const response = result.response;
    return response.text();

  } catch (error) {
    console.error("Error occurred while sending message:", error);
  }
}

export default run;
