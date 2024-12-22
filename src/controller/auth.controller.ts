import { UnauthorizedException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { z } from 'zod';

import { PrismaService } from "src/prisma/prisma.service";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { JwtService } from "@nestjs/jwt";

const AuthSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type AuthDto = z.infer<typeof AuthSchema>;

@Controller('/auth')
export class AuthController {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(AuthSchema))
  async handle(@Body() body: AuthDto) {
    const { email,password } = body;

    const user = await this.prisma.users.findUnique({
      where: {
        email: email
      }
    })

    if(!user) {
      throw new UnauthorizedException('E-mail e ou senha inválido')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      throw new UnauthorizedException('E-mail e ou senha inválido')
    }
    
    const token = this.jwt.signAsync({ sub: user.id });

    return {
      access_token: token
    }
  }
}