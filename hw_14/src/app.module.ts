import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExhibitsModule } from './exhibits/exhibits.module';

@Module({
  imports: [UsersModule, AuthModule, ExhibitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
