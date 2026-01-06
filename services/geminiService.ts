import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real production app, API keys should be handled via a proxy server 
// to avoid exposing them in client-side code, but for this demo per instructions:
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getStyleConsultation = async (userDescription: string): Promise<string> => {
  try {
    if (!apiKey) {
      return "Configuração de API Key ausente. Por favor, configure a chave para usar a IA.";
    }

    const model = 'gemini-3-flash-preview';
    
    const prompt = `
      Você é um barbeiro especialista e consultor de estilo de classe mundial.
      Um cliente descreveu suas características e desejos assim: "${userDescription}".
      
      Com base nisso, sugira o melhor corte de cabelo e estilo de barba para ele.
      Seja conciso (máximo 3 frases). Recomende um dos seguintes serviços se aplicável: Corte de Cabelo, Barba Completa, Corte + Barba.
      Mantenha um tom profissional e encorajador.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Flash model for speed
      }
    });

    return response.text || "Desculpe, não consegui gerar uma recomendação no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Houve um erro ao consultar o estilista virtual. Tente novamente mais tarde.";
  }
};
