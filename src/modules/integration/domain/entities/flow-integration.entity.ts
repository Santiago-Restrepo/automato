import { ClientMap } from 'src/modules/client/application/clients/types/client-map.type';

export class FlowIntegration {
  constructor(
    public readonly id: number,
    public integrationId: number,
    public flowId: number,
    public clientEmail: string,
    public privateKey: string,
    public clientId: string,
    public clientSecret: string,
    public apiKey: string,
    public integrationName: keyof ClientMap,
  ) {}
}
