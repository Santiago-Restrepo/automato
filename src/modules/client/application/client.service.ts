import { Injectable } from '@nestjs/common';
import ShopifyClient from './clients/shopify.client';
import { ClientMap } from './clients/types/client-map.type';
import GoogleSheetsClient from './clients/google-sheets.client';
import { FlowIntegration } from 'src/modules/integration/domain/entities/flow-integration.entity';

@Injectable()
export class ClientService {
  constructor() {}

  private clients = new Map<string, any>();

  initialize(flowIntegrations: FlowIntegration[]) {
    flowIntegrations.forEach((flowIntegration) => {
      if (!this.clients.has(flowIntegration.integrationName)) {
        this.clients.set(
          flowIntegration.integrationName,
          this.createClient(flowIntegration.integrationName, {
            ...flowIntegration,
          }),
        );
      }
    });
  }

  private createClient<K extends keyof ClientMap>(
    name: K,
    credentials: {
      apiKey: string;
      clientId?: string;
      clientSecret?: string;
      clientEmail?: string;
      privateKey?: string;
    },
  ): ClientMap[K] {
    const { apiKey, clientEmail, privateKey } = credentials;
    switch (name) {
      case 'Shopify':
        return new ShopifyClient(apiKey) as ClientMap[K];
      case 'GoogleSheets':
        return new GoogleSheetsClient({
          clientEmail,
          privateKey,
        }) as ClientMap[K];

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
