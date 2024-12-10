"use server";

import ollama from "ollama";


 
export async function generateEmbeddings(text:string) {
    if (!text) {
      throw new Error("Text cannot be empty");
    }
  
    const embeddings = await ollama.embeddings({
      model:"snowflake-arctic-embed" ,
      prompt:text
    })
    const embeddingsArray = embeddings.embedding;
    return embeddingsArray;
}