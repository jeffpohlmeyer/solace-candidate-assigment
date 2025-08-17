import * as dotenv from 'dotenv'

// Try to load from multiple possible locations
dotenv.config({ path: './.env.local' });
dotenv.config({ path: './.env' });

const config = {
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
};

export default config;
