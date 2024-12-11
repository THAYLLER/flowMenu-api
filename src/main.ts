import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

import { Env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false
  });

  //const configService = app.get(ConfigService);
  //const port = configService.get('PORT');
  


  await app.listen(3333);
}
bootstrap();
