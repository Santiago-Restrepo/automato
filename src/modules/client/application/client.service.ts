import { Injectable } from '@nestjs/common';
import FlowIntegration from 'src/modules/integration/domain/flow-integration.entity';
import ShopifyClient from './clients/shopify.client';
import { ClientMap } from './clients/types/client-map.type';

@Injectable()
export class ClientService {
  constructor() {}

  private clients = new Map<string, any>();

  initialize(flowIntegrations: FlowIntegration[]) {
    flowIntegrations.forEach((flowIntegration) => {
      if (!this.clients.has(flowIntegration.integration?.name)) {
        const apiKey = flowIntegration.apiKey;
        this.clients.set(
          flowIntegration.integration.name,
          this.createClient(flowIntegration.integration.name, apiKey),
        );
      }
    });
  }

  private createClient<K extends keyof ClientMap>(
    name: K,
    apiKey: string,
  ): ClientMap[K] {
    switch (name) {
      case 'Shopify':
        return new ShopifyClient(apiKey) as ClientMap[K];

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
