import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.getUserByIdOrName(undefined, username);
    if (!user) throw new UnauthorizedException('Invalid username or password');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid username or password');

    const accessToken = this.jwtService.sign(
      { sub: user.id, username: user.username },
      { secret: 'access_secret', expiresIn: '1h' }
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id, username: user.username },
      { secret: 'refresh_secret', expiresIn: '7d' } 
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      userName: user.username,
      userId: user.id,
    };
  }

  async refresh(userId: number, username: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, username },
      { secret: 'access_secret', expiresIn: '1h' }
    );

    return { access_token: accessToken };
  }
}