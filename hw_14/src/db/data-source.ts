import { DataSource } from 'typeorm';
import { User } from '../users/users.entity';
import { Exhibit } from '../exhibits/exhibits.entity';
import { Comment } from '../comments/comments.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'blog',
  entities: [User, Exhibit, Comment],
  migrations: ['dist/migrations/*.js'],
  synchronize: false, 
});