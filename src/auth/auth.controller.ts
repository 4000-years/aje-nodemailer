import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from 'src/user/entity/entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signUp(@Body() userDto: User): Promise<void> {
    return this.authService.signUp(userDto);
  }
}
