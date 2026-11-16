import dotenv from 'dotenv';
dotenv.config();

import { app } from './app.js';

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`[apps/api] Course 4 Task Manager API listening on http://localhost:${PORT}`);
  console.log(`[apps/api] Health check: http://localhost:${PORT}/health`);
});
