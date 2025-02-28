export class FlowIntegrationSecret {
  constructor(
    public readonly id: string,
    public flowIntegrationId: number,
    public key: string,
    public value: string,
  ) {}
}
