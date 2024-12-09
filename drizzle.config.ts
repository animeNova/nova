import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import fs from 'fs'
export default defineConfig({
  out: './drizzle',
  schema: './drizzle/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  
});