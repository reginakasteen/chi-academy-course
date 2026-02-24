import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExhibitsService } from './exhibits.service';
import { ExhibitsController } from './exhibits.controller';
import { Exhibit } from './exhibits.entity';
import { User } from '../users/users.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibit, User]), NotificationsModule],
  providers: [ExhibitsService],
  controllers: [ExhibitsController],
})
export class ExhibitsModule {}
