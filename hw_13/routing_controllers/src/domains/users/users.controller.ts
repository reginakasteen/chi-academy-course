import { JsonController, Get, Post, Patch, Delete, Param, Body, BadRequestError } from "routing-controllers";
import { CreateUserDto, UpdateUserDto } from "./users.dto";
import * as userService from "./users.service";

@JsonController("/users")
export class UsersController {
  @Get("/")
  async getAll() {
    return await userService.getAllUsers();
  }

  @Get("/:id")
  async getOne(@Param("id") id: string) {
    const user = await userService.getUserById(Number(id));
    if (!user) throw new BadRequestError("User not found");
    return user;
  }

  @Post("/")
  async create(@Body({ required: true }) body: CreateUserDto) {
    return await userService.createUser(body);
  }

  @Patch("/:id")
  async update(@Param("id") id: string, @Body({ required: true }) body: UpdateUserDto) {
    const user = await userService.updateUser(Number(id), body);
    if (!user) throw new BadRequestError("User not found");
    return user;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const success = await userService.deleteUser(Number(id));
    if (!success) throw new BadRequestError("User not found");
    return { success: true };
  }
}
