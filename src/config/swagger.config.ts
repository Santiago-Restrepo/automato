import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const bearerAuthOptions: SecuritySchemeObject = {
  name: 'Authorization',
  description: 'Enter token',
  type: 'http',
  in: 'Header',
};

const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Automato')
    .setDescription('Automato API')
    .setVersion('1.0')
    .addBearerAuth(bearerAuthOptions, 'TOKEN')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};

export default setupSwagger;
