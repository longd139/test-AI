import { prepareE2eDatabase } from './global-setup.js';

prepareE2eDatabase().catch((error) => {
  console.error('Failed to prepare isolated E2E database:', error);
  process.exitCode = 1;
});
