import { Injectable } from '@nestjs/common';
import ShopifyClient from './clients/shopify.client';
import { ClientMap } from './clients/types/client-map.type';
import GoogleSheetsClient from './clients/google-sheets.client';
import { FlowIntegration } from 'src/modules/flow-integration/domain/flow-integration.entity';
import { ClientKeys } from '../domain/enums/client-keys.enum';

@Injectable()
export class ClientService {
  constructor() {}

  private clients = new Map<string, any>();

  initialize(flowIntegrations: FlowIntegration[]) {
    flowIntegrations.forEach((flowIntegration) => {
      if (!flowIntegration.integrationName)
        throw new Error('Missing integration name');
      if (!this.clients.has(flowIntegration.integrationName)) {
        const credentials = Object.fromEntries(
          flowIntegration.secrets?.map((secret) => [
            secret.key,
            secret.value,
          ]) || [],
        );
        this.clients.set(
          flowIntegration.integrationName,
          this.createClient(flowIntegration.integrationName, credentials),
        );
      }
    });
  }

  private createClient<K extends keyof ClientMap>(
    name: ClientKeys,
    credentials: any,
  ): ClientMap[K] {
    switch (name) {
      case 'Shopify':
        return new ShopifyClient(credentials) as ClientMap[K];
      case 'GoogleSheets':
        return new GoogleSheetsClient(credentials) as ClientMap[K];

      default:
        throw new Error(`Unknown integration: ${name}`);
    }
  }

  getClient<K extends keyof ClientMap>(name: K): ClientMap[K] {
    if (!this.clients.has(name))
      throw new Error(`Client for ${name} not initialized`);
    return this.clients.get(name) as ClientMap[K];
  }
}
