import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiTooManyRequestsResponse,
  ApiBody,
} from '@nestjs/swagger';

import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and return access + refresh tokens',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Successfully authenticated',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiTooManyRequestsResponse({
    description: 'Too many login attempts. Try again later.',
  })
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  
  @ApiOperation({
    summary: 'Refresh JWT tokens',
    description: 'Generate new access and refresh tokens',
  })
  @ApiBody({ type: RefreshDto })
  @ApiResponse({
    status: 201,
    description: 'Tokens refreshed successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid refresh request',
  })
  @ApiTooManyRequestsResponse({
    description: 'Too many refresh attempts',
  })
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.userId, dto.username);
  }
}