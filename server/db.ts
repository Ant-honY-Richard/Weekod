import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

// Initialize the Postgres client with the database URL from environment variables
const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString!);

// Initialize Drizzle with the Postgres client and schema
export const db = drizzle(client, { schema });