import { getConfig } from './config.js';
import { app } from './app.js';
import { logger } from './logger.js';

// Fail-fast configuration validation: will halt process if required config is missing
const config = getConfig();

app.listen(config.PORT, () => {
  logger.info('Task Manager API server initialized successfully', {
    port: config.PORT,
    environment: config.NODE_ENV,
    corsOrigin: config.CORS_ORIGIN,
    incidentDrillEnabled: config.INCIDENT_DRILL_ENABLED,
  });
  console.log(`[apps/api] Course 4 Task Manager API listening on http://localhost:${config.PORT}`);
  console.log(`[apps/api] Health check: http://localhost:${config.PORT}/health`);
});
