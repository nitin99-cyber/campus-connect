
import { GoogleGenAI, Type } from "@google/genai";
import { Student, Quiz } from "../types";

// NOTE: In a real production app, this key should be proxied or handled securely.
// For this demo, we assume process.env.API_KEY is available.

export const GeminiService = {
  /**
   * Parses a natural language search query to extract structured filters.
   */
  async parseSearchQuery(query: string): Promise<{ skills: string[], year?: number, branch?: string }> {
    if (!query) return { skills: [] };

    try {
      // Guideline: Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        // Guideline: Use gemini-3-flash-preview for basic text tasks
        model: 'gemini-3-flash-preview',
        contents: `Extract search filters from this query: "${query}".
        Return JSON with keys: 'skills' (array of strings), 'year' (number, or null), 'branch' (string, or null).
        Example: "Find a 3rd year CS student who knows React" -> {"skills": ["React"], "year": 3, "branch": "CS"}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              year: { type: Type.NUMBER, nullable: true },
              branch: { type: Type.STRING, nullable: true },
            }
          }
        }
      });

      const text = response.text;
      if (!text) return { skills: [] };
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini Search Error:", error);
      return { skills: [] };
    }
  },

  /**
   * Parses raw text (like a resume or LinkedIn bio) to fill a student profile.
   */
  async parseProfileData(textData: string): Promise<Partial<Student>> {
    try {
      // Guideline: Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        // Guideline: Use gemini-3-flash-preview for basic text tasks
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following text (resume, LinkedIn bio, or introduction) and extract student profile data.
        Text: "${textData}"
        
        Extract:
        - Bio: A professional summary (max 300 chars).
        - Skills: List of technical skills.
        - Achievements: Awards, hackathons, or key accomplishments.
        - Socials: GitHub, LinkedIn, Portfolio URLs if present.
        - Branch: The field of study (e.g., Computer Science, Electronics).
        - Year: The current year of study (1-4). Inference allowed.
        
        Return JSON.`,
        config: {
          responseMimeType: "application/json",
           responseSchema: {
            type: Type.OBJECT,
            properties: {
              bio: { type: Type.STRING },
              skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              achievements: { type: Type.ARRAY, items: { type: Type.STRING } },
              branch: { type: Type.STRING, nullable: true },
              year: { type: Type.INTEGER, nullable: true },
              socials: {
                type: Type.OBJECT,
                properties: {
                  github: { type: Type.STRING, nullable: true },
                  linkedin: { type: Type.STRING, nullable: true },
                  portfolio: { type: Type.STRING, nullable: true }
                }
              }
            }
          }
        }
      });

      const text = response.text;
      if (!text) return {};
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini Profile Parse Error:", error);
      return {};
    }
  },

  /**
   * Generates a quiz based on a topic.
   */
  async generateQuiz(topic: string): Promise<Quiz | null> {
    try {
      // Guideline: Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        // Guideline: Use gemini-3-flash-preview for basic text tasks
        model: 'gemini-3-flash-preview',
        contents: `Create a technical quiz with 20 questions about: "${topic}".
        Questions should be a mix of Easy (6), Medium (8), and Hard (6) difficulty.
        Return JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctAnswer: { type: Type.INTEGER, description: "Zero-based index of the correct option" },
                    difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard'] }
                  }
                }
              }
            }
          }
        }
      });
      const text = response.text;
      if (!text) return null;
      const data = JSON.parse(text);
      return { ...data, id: Date.now().toString() };
    } catch (error) {
      console.error("Gemini Quiz Error:", error);
      return null;
    }
  }
};
