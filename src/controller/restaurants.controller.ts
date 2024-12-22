import { Get, Controller, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "src/auth/jwt-auth.guards";


@Controller('/restaurants')
@UseGuards(JwtAuthGuard)
export class RestaurantsController {
  constructor() {}

  @Get()
  async handle() {

    return 'ok';
  }
    
}