import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";
import { dinosaursRelations, tasksRelations } from "./relations.ts";
import pg from "pg";
import { integer } from "drizzle-orm/sqlite-core";
import { eq } from "drizzle-orm/expressions";
import env from '../env.ts';

// Use pg driver.
const { Pool } = pg;

// Instantiate Drizzle client with pg driver and schema.
export const db = drizzle({
  client: new Pool({
    connectionString: env.DATABASE_URL
  }),
  schema
});