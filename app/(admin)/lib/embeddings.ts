"use server";

import * as use from '@tensorflow-models/universal-sentence-encoder';
import '@tensorflow/tfjs'; // Import TensorFlow.js

 
export async function generateEmbeddings(text:string) {
    if (!text) {
      throw new Error("Text cannot be empty");
    }
    const model = await use.load();

    const embeddings = await model.embed(text);
    return embeddings.array()
}