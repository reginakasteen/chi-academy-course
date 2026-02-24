import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  private mapToDto(user: User): UserResponseDto {
    return new UserResponseDto({
      id: user.id,
      username: user.username,
    });
  }

  async getUserByIdOrName(id?: number, username?: string): Promise<User | null> {
    const where: any = {};
    if (id) where.id = id;
    if (username) where.username = username;

    return this.usersRepository.findOne({ where });
  }

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await this.usersRepository.findOne({
      where: { username: dto.username },
    });

    if (existing) throw new BadRequestException('User already exists');

    const passwordHash = await bcrypt.hash(dto.password, 15);

    const user = this.usersRepository.create({
      username: dto.username,
      password: passwordHash,
    });

    const saved = await this.usersRepository.save(user);

    return this.mapToDto(saved);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) return null;
    if (data.password) data.password = await bcrypt.hash(data.password, 15);
    Object.assign(user, data);
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const res = await this.usersRepository.delete(id);
    return res.affected !== 0;
  }
}