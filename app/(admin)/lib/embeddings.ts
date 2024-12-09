"use server";

import * as use from "@tensorflow-models/universal-sentence-encoder";
let model: use.UniversalSentenceEncoder | null = null;
async function loadModel(): Promise<use.UniversalSentenceEncoder> {
    if (!model) {
      model = await use.load();
    }
    return model;
  }
  
  export async function generateEmbeddings(text:string): Promise<number[]> {
    if (!text) {
      throw new Error("Text cannot be empty");
    }
  
    const model = await loadModel();
    const embeddings = await model.embed([text]);
    const embeddingsArray = embeddings.arraySync();
    return embeddingsArray[0]; // Return the embedding for the input text
  }