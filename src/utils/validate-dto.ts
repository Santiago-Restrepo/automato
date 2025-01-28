import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const validateDto = <T>(
  dto: ClassConstructor<T>,
  obj: Record<string, unknown>,
) => {
  const validatedConfig = plainToInstance(dto, obj, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig as object, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const error = errors.toString();
    throw new Error(error);
  }

  return validatedConfig;
};
