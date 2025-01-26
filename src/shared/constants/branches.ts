import { Environment } from '../enums/environment';

export const branches: Record<Environment, string> = {
  [Environment.Development]: 'develop',
  [Environment.Staging]: 'stage',
  [Environment.Production]: 'main',
};
