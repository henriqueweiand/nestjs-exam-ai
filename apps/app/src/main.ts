import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload-ts';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    abortOnError: false,
    bufferLogs: true,
  });

  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['content-type', 'x-apollo-operation-name', 'apollo-require-preflight'],
  });

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }));

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');

  await app.listen(port);
}
bootstrap();
