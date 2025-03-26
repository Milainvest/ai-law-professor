import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env, validateEnv } from './config/env';

// Validate environment variables
validateEnv();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: 'Internal Server Error',
      ...(env.NODE_ENV === 'development' && { details: err.message }),
    },
  });
});

// Start server
const server = app.listen(env.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${env.PORT}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;
