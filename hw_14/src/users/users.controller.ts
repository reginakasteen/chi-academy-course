import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error or user already exists',
  })
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.usersService.createUser(dto);

    return new UserResponseDto({
      id: user.id,
      username: user.username,
    });
  }

  @ApiOperation({ summary: 'Get user by id or username' })
  @ApiQuery({ name: 'id', required: false, example: 1 })
  @ApiQuery({ name: 'username', required: false, example: 'username' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Get()
  async getUser(
    @Query('id') id?: string,
    @Query('username') username?: string,
  ) {
    const userId = id ? Number(id) : undefined;
    const user = await this.usersService.getUserByIdOrName(userId, username);

    if (!user) throw new NotFoundException('User not found');

    return new UserResponseDto({
      id: user.id,
      username: user.username,
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'Current user profile',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('my-profile')
  async getMyProfile(@CurrentUser() user: JwtPayload) {
    const foundUser = await this.usersService.getUserByIdOrName(user.sub);

    if (!foundUser) throw new NotFoundException('User not found');

    return new UserResponseDto({
      id: foundUser.id,
      username: foundUser.username,
    });
  }
}