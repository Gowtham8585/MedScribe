import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const parsePrescriptionText = async (text) => {
  if (!text || text.trim() === '') return null;

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
      Extract structured prescription data from the following doctor's dictation.
      The dictation may be in English, Tamil, or mixed.
      Translate the extracted medicine schedules into standard English terms (e.g. "Morning", "Afternoon", "Evening", "Before Food", "After Food") for internal structuring.
      
      Return ONLY a valid JSON object with the following structure:
      {
        "symptoms": "String describing symptoms or diagnosis",
        "medicines": [
          {
            "name": "Medicine Name with dosage",
            "morning": "Before Food or After Food or -",
            "afternoon": "Before Food or After Food or -",
            "evening": "Before Food or After Food or -",
            "duration": "e.g., 5 Days"
          }
        ],
        "advice": ["Array of advice strings"],
        "followUp": "Follow up instructions, or empty string"
      }
      
      Text to parse:
      "${text}"
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      let cleanJson = responseText.trim();
      if (cleanJson.startsWith('```json')) cleanJson = cleanJson.substring(7);
      if (cleanJson.startsWith('```')) cleanJson = cleanJson.substring(3);
      if (cleanJson.endsWith('```')) cleanJson = cleanJson.substring(0, cleanJson.length - 3);
      
      return JSON.parse(cleanJson.trim());
    } catch (error) {
      console.error("Parse Error:", error);
      return fallbackParse(text);
    }
  } else {
    return fallbackParse(text);
  }
};

const fallbackParse = (text) => {
  const lowerText = text.toLowerCase();
  
  const result = {
    symptoms: text || "As described by patient.",
    medicines: [],
    advice: ["Take rest", "Drink plenty of water"],
    followUp: "After 5 days"
  };

  if (lowerText.includes('pantoprazole')) {
    result.medicines.push({
      name: "Pantoprazole 40 mg",
      morning: "Before Food",
      afternoon: "-",
      evening: "-",
      duration: "5 Days"
    });
  }
  
  if (lowerText.includes('paracetamol')) {
    result.medicines.push({
      name: "Paracetamol 500 mg",
      morning: "After Food",
      afternoon: "-",
      evening: "After Food",
      duration: "3 Days"
    });
  }

  if (result.medicines.length === 0) {
    result.medicines.push({
      name: "Generic Medicine (No AI API key found)",
      morning: "After Food",
      afternoon: "-",
      evening: "After Food",
      duration: "3 Days"
    });
  }

  return new Promise(resolve => setTimeout(() => resolve(result), 1000));
};
