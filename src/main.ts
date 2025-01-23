import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config, ServerConfig } from './config/configuration';
import { Logger } from '@nestjs/common';
import setupSwagger from './config/swagger.config';
import { ConfigService } from '@nestjs/config';
import setupPipes from './config/global-pipes.config';
import { SessionBuilder } from '@ngrok/ngrok';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<Config, true>>(ConfigService);
  const server: ServerConfig = configService.get('server');
  setupPipes(app);
  setupSwagger(app);
  await app.listen(server.port).then(() => {
    Logger.verbose(`Server running on port ${server.port}`);
    Logger.verbose(
      `Swagger docs running on http://localhost:${server.port}/docs`,
    );
  });
  if (process.env.NGROK_AUTHTOKEN) {
    // Setup ngrok ingress
    const session = await new SessionBuilder().authtokenFromEnv().connect();
    const listener = await session.httpEndpoint().listen();
    Logger.verbose(`Ingress established at ${listener.url()}`);
    listener.forward(`localhost:${server.port}`);
  }
}
bootstrap();
