import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibit } from './exhibits.entity';
import { User } from '../users/users.entity';
import { ExhibitResponseDto } from './dto/exhibit-response.dto';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Injectable()
export class ExhibitsService {
  constructor(
    @InjectRepository(Exhibit)
    private exhibitsRepository: Repository<Exhibit>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private notificationsGateway: NotificationsGateway,
  ) {}

  private mapToDto(exhibit: Exhibit): ExhibitResponseDto {
    return new ExhibitResponseDto({
      id: exhibit.id,
      imageUrl: exhibit.imageUrl,
      description: exhibit.description,
      createdAt: exhibit.createdAt,
      user: {
        id: exhibit.user.id,
        username: exhibit.user.username,
      },
    });
  }

  async getExhibitById(id: number): Promise<ExhibitResponseDto> {
    const exhibit = await this.exhibitsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!exhibit) throw new NotFoundException(`Exhibit ${id} not found`);

    return this.mapToDto(exhibit);
  }

  async getAllExhibits(page = 1, limit = 10) {
    const [data, total] = await this.exhibitsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });

    return {
      data: data.map((exhibit) => this.mapToDto(exhibit)),
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async createExhibit(
    description: string,
    imageUrl: string,
    userId: number,
  ): Promise<ExhibitResponseDto> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) throw new NotFoundException(`User ${userId} not found`);

    const exhibit = this.exhibitsRepository.create({
      description,
      imageUrl,
      user,
    });

    const saved = await this.exhibitsRepository.save(exhibit);

    //send notification
    this.notificationsGateway.notifyNewPost({
      username: user.username,
      userId: user.id,
      postId: saved.id,
    });

    return this.mapToDto(saved);
  }

  async deleteExhibit(id: number, userId: number): Promise<void> {
    const exhibit = await this.exhibitsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!exhibit) throw new NotFoundException('Exhibit not found');

    if (exhibit.user.id !== userId)
      throw new ForbiddenException('Permission denied');

    await this.exhibitsRepository.remove(exhibit);
  }
}