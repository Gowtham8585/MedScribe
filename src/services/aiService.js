import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize with environment variable if available
// In Vite, it's import.meta.env.VITE_GEMINI_API_KEY
const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const aiService = {
  async reviewTranscription(text) {
    if (!text || text.trim() === '') {
      return [];
    }

    if (!genAI) {
      console.warn("No Gemini API key found. Using mock AI response for demonstration.");
      return this.mockReview(text);
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
      You are a medical transcription assistant. Review the following text dictated by a doctor. 
      The text may contain a mix of English and Tamil words.
      Detect possible speech recognition or spelling errors, particularly in medical terms or medicine names.
      Return ONLY a valid JSON array of objects representing correction suggestions. Do not include markdown formatting or backticks.
      
      Format of each object:
      {
        "id": "unique-string-id",
        "original": "The exact substring from the text that might be wrong",
        "suggested": "The corrected text",
        "reason": "Short explanation of the possible error"
      }
      
      If there are no errors, return an empty array [].
      
      Text to review:
      "${text}"
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Clean up markdown block if present
      let cleanJson = responseText.trim();
      if (cleanJson.startsWith('```json')) {
        cleanJson = cleanJson.substring(7);
      }
      if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.substring(3);
      }
      if (cleanJson.endsWith('```')) {
        cleanJson = cleanJson.substring(0, cleanJson.length - 3);
      }
      
      return JSON.parse(cleanJson.trim());
    } catch (error) {
      console.error("AI Review Error:", error);
      throw new Error("Failed to process AI review. " + error.message);
    }
  },

  // Fallback for demonstration when no API key is present
  mockReview(text) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple mock logic: if we see common demo words, suggest corrections
        const suggestions = [];
        
        if (text.toLowerCase().includes('pantaprasol')) {
          suggestions.push({
            id: 'mock-1',
            original: 'Pantaprasol', // We assume they typed this
            suggested: 'Pantoprazole',
            reason: 'Possible medicine name transcription error'
          });
        }
        
        if (text.toLowerCase().includes('paraseetmol') || text.toLowerCase().includes('parasitamol')) {
          suggestions.push({
            id: 'mock-2',
            original: text.match(/paras[a-z]+mol/i)?.[0] || 'parasitamol',
            suggested: 'Paracetamol',
            reason: 'Standardized spelling for acetaminophen'
          });
        }
        
        // If it's just a generic test, return a generic mock
        if (suggestions.length === 0 && text.length > 10) {
           suggestions.push({
             id: 'mock-generic',
             original: text.split(' ')[0], // just take first word as a demo
             suggested: text.split(' ')[0] + ' (Corrected)',
             reason: 'Demo mock correction'
           });
        }

        resolve(suggestions);
      }, 1500); // Simulate network delay
    });
  }
};
