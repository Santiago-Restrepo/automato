export class FlowIntegrationSecret {
  constructor(
    public readonly id: number,
    public flowIntegrationId: number,
    public key: string,
    public value: string,
  ) {}
}
