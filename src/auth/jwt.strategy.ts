import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { z } from "zod";
import { Injectable } from "@nestjs/common";

import { Env } from "src/env";

const tokenSchema = z.object({
  sub: z.string().uuid(),
})

type TokenSchema = z.infer<typeof tokenSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const public_key = config.get('JWT_PUBLIC_KEY', { infer: true } )

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(public_key, 'base64'),
      algorithm: ['RS256'] 
    });
  }

  async validate(payload: TokenSchema) {
    return tokenSchema.parse(payload)
  }
}