import { ClientKeys } from 'src/modules/client/domain/enums/client-keys.enum';

export class Integration {
  constructor(
    public readonly id: number,
    public name: ClientKeys,
  ) {}

  static create(name: ClientKeys): Integration {
    return new Integration(0, name);
  }
}
