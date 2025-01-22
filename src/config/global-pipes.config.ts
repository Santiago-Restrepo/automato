import { INestApplication, ValidationPipe } from '@nestjs/common';

const setupPipes = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
};

export default setupPipes;
