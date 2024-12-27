import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { SessionBuilder } from '@ngrok/ngrok';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configuration().port);

  if (process.env.NGROK_AUTHTOKEN) {
    // Setup ngrok ingress
    const session = await new SessionBuilder().authtokenFromEnv().connect();
    const listener = await session.httpEndpoint().listen();
    new Logger('main').log(`Ingress established at ${listener.url()}`);
    listener.forward(`localhost:${configuration().port}`);
  }
}
bootstrap();
