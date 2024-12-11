import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CreateUsersControoler } from './controller/create-users.controller';

import { PrismaService } from './prisma/prisma.service';
import { envSchema } from './env';


@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [CreateUsersControoler],
  providers: [PrismaService],
})
export class AppModule {}