import { Injectable } from '@nestjs/common';
import {
  HealthCheckService as NestHealthCheckService,
  TypeOrmHealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { readFileSync } from 'fs';
import configuration from 'src/config/configuration';
import { branches } from 'src/shared/constants/branches';

@Injectable()
export class HealthCheckService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly health: NestHealthCheckService,
    private readonly database: TypeOrmHealthIndicator,
  ) {}

  private databaseHealthIndicator() {
    return () =>
      this.database
        .pingCheck('database', { timeout: 5000 })
        .catch(async (err) => {
          return err;
        });
  }

  getLastCommitDetails() {
    try {
      const environment = configuration().server.env;
      if (!environment || !branches[environment]) {
        throw new Error('Environment not defined');
      }
      const branch = branches[environment];
      const commitId = readFileSync(`git-refs-heads/${branch}`).toString();
      const healthIndicator: HealthIndicatorResult = {
        lastCommit: {
          status: 'up',
          id: commitId,
        },
      };
      return () => healthIndicator;
    } catch (error: any) {
      const healthIndicator: HealthIndicatorResult = {
        lastCommit: {
          status: 'down',
          id: 'unknown',
          message: error.message || 'error getting last commit details',
        },
      };
      return () => healthIndicator;
    }
  }

  async check() {
    return this.health.check([this.databaseHealthIndicator()]);
  }
}
