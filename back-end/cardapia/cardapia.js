import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: "SUA_CHAVE" });

async function gerarReceita(listaIngredientes) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash", // Versão rápida e barata para apps
    generationConfig: { responseMimeType: "application/json" } // Força o retorno em JSON
  });

  const prompt = `Crie uma receita saudável usando: ${listaIngredientes}. 
                  Calcule as calorias aproximadas. 
                  Responda estritamente no formato JSON: 
                  { "titulo": string, "calorias": number, "modo_preparo": string[] }`;

  const result = await model.generateContent(prompt);
  const response = JSON.parse(result.response.text());
  
  return response;
}