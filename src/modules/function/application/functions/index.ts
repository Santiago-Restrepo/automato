import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { StepFunction } from '../../domain/entities/step-function.entity';
import { Logger } from '@nestjs/common';

const functionsDir = join(__dirname, 'categories');
type StepFunctions = { [key: string]: StepFunction };
const stepFunctions: StepFunctions = {};

readdirSync(functionsDir).forEach((category) => {
  const categoryPath = join(functionsDir, category);

  if (!statSync(categoryPath).isDirectory()) return;

  readdirSync(categoryPath).forEach((functionName) => {
    const functionPath = join(categoryPath, functionName);
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fn = require(functionPath).default;
      stepFunctions[functionName.replace(/\.(js|ts)$/, '')] = fn;
      Logger.verbose(`✅ Loaded function ${functionName}`);
    } catch (err) {
      Logger.error(`❌ Error loading function from ${functionPath}:`, err);
    }
  });
});

export default stepFunctions;
