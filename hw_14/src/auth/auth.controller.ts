import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  async login(@Body() body: CreateUserDto) {
    return this.authService.login(body.username, body.password);
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('refresh')
  async refresh(@Body() body: { userId: number; username: string }) {
    return this.authService.refresh(body.userId, body.username);
  }
}