export class Trigger {
  constructor(
    public readonly id: number,
    public description: string | null,
    public isActive: boolean,
    public payloadKey: string,
    public flowId: number,
  ) {}
}
