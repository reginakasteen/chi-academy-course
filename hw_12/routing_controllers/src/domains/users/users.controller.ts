import { Get, Param, Post, Body, JsonController, Patch, Delete, BadRequestError } from 'routing-controllers';
import type { User } from '../../types/types';
import { readUsers, writeUsers } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@JsonController('/users')
export class UsersController {

  @Get('/')
  getAll() {
    return readUsers();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    const users: User[] = readUsers();
    const user = users.find(u => u.id === Number(id));
    if (!user) throw new BadRequestError('User not found');
    return user;
  }

  @Post('/')
  create(@Body({ required: true }) body: CreateUserDto) {
    const users = readUsers();

    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser: User = {
      id: newId,
      user: body.user,
      email: body.email
    };

    users.push(newUser);
    writeUsers(users);

    return newUser;
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body({ required: true }) body: UpdateUserDto) {
    const users = readUsers();
    const user = users.find(u => u.id === Number(id));

    if (!user) throw new BadRequestError('User not found');

    Object.assign(user, body);
    writeUsers(users);

    return user;
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    const users = readUsers();
    const filtered = users.filter(u => u.id !== Number(id));

    if (filtered.length === users.length) throw new BadRequestError('User not found');

    writeUsers(filtered);
    return { success: true };
  }
}
