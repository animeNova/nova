"use server";

import * as use from '@tensorflow-models/universal-sentence-encoder';
// Add these imports to fix the backend error
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-cpu';
// If you want WebGL support (recommended for better performance)
import '@tensorflow/tfjs-backend-webgl';


export async function generateEmbeddings(text:string) {
    if (!text) {
      throw new Error("Text cannot be empty");
    }
    await tf.ready();
    // Explicitly set the backend to 'webgl' if available, fallback to 'cpu'
    const backend = tf.findBackend('webgl') ? 'webgl' : 'cpu';
    await tf.setBackend(backend);
    const model = await use.load();

    const embeddings = await model.embed(text);
    return embeddings.array()
}