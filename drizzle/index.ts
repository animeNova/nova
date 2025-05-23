import 'dotenv/config';
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from '@/drizzle/db/schema'
import fs from 'fs';

import { Pool } from "pg";
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL!
    });
    export const db = drizzle(pool,{schema});

