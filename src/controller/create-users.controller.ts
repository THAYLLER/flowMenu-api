import { ConflictException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { z } from 'zod';

import { PrismaService } from "src/prisma/prisma.service";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";

const CreateUserSchema = z.object({
  fullName: z.string().min(1, 'O nome completo é obrigatório'),
  socialName: z.string().optional(),
  fantasyName: z.string().optional(),
  document: z.string().min(11, 'O documento deve conter ao menos 11 caracteres'),
  whatsapp: z.string().optional(),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  orderVolume: z.string(),
  modules: z.array(z.string()).nonempty('Os módulos são obrigatórios'),
});

type CreateUserDto = z.infer<typeof CreateUserSchema>;

@Controller('/auth')
export class CreateUsersController {
  constructor(private prisma: PrismaService) {}

  @Post('/create')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async handle(@Body() body: CreateUserDto) {
    const { email, document, password, fullName, socialName, fantasyName, whatsapp, orderVolume, modules } = body;

    const userWithSameEmail = await this.prisma.users.findUnique({
      where: {
        email: email
      }
    })
     const userWithSameDocument = await this.prisma.users.findUnique({
      where: {
        document: document
      }
    })

    if(userWithSameEmail) {
      throw new ConflictException('E-mail já cadastrado')
    }

    if(userWithSameDocument) {
      throw new ConflictException('Documento já cadastrado')
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.users.create({
      data: {
        fullName,
        socialName,
        fantasyName,
        document,
        whatsapp,
        email,
        password: hashedPassword,
        orderVolume,
        modules,
      },
    })
  }
}