import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Req,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  async getUser(@Query('id') id?: string, @Query('username') username?: string) {
    const userId = id ? Number(id) : undefined;
    const user = await this.usersService.getUserByIdOrName(userId, username);

    if (!user) throw new NotFoundException('User not found');

    return new UserResponseDto({
      id: user.id,
      username: user.username,
    });
  }

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