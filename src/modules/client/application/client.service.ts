import { Injectable } from '@nestjs/common';
import FlowIntegration from 'src/modules/integration/domain/flow-integration.entity';
import ShopifyClient from './clients/shopify.client';
import { ClientMap } from './clients/types/client-map.type';
import GoogleClient from './clients/google.client';
import GoogleSheetsClient from './clients/google-sheets.client';

@Injectable()
export class ClientService {
  constructor() {}

  private clients = new Map<string, any>();

  initialize(flowIntegrations: FlowIntegration[]) {
    flowIntegrations.forEach((flowIntegration) => {
      if (!this.clients.has(flowIntegration.integration?.name)) {
        this.clients.set(
          flowIntegration.integration.name,
          this.createClient(flowIntegration.integration.name, {
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
