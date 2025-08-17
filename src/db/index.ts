import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL environment variable is not set');
}

export const pool = postgres(process.env.DATABASE_URL, {
	max: 20,
	idle_timeout: 30,
	connect_timeout: 2
});

export const db = drizzle(pool, { schema });

export { schema };
