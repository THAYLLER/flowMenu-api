import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CreateUsersController } from './controller/create-users.controller';

import { PrismaService } from './prisma/prisma.service';

import { envSchema } from './env';

import { AuthModule } from './auth/auth.module';
import { AuthController } from './controller/auth.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule
  ],
  controllers: [
    CreateUsersController, 
    AuthController
  ],
  providers: [PrismaService],
})
export class AppModule {}
