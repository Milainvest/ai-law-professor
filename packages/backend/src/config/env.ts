import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3001', 10),
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ai_law_professor',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  // Add other environment variables as needed
} as const;

// Validate required environment variables
export const validateEnv = () => {
  const requiredEnvVars: Array<keyof typeof env> = [
    'NODE_ENV',
    'PORT',
    'DATABASE_URL',
  ];

  const missingEnvVars = requiredEnvVars.filter((key) => !env[key]);

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  }
};
