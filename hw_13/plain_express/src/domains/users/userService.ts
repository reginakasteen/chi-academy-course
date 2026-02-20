import { AppDataSource } from "../../db/data-source";
import { User } from "./usersModel";

const userRepository = AppDataSource.getRepository(User);
6
export const getAllUsers = async (): Promise<User[]> => {
  return await userRepository.find();
};

export const getUserById = async (id: number): Promise<User | null> => {
  return await userRepository.findOneBy({ id });
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const user = userRepository.create(userData);
  return await userRepository.save(user);
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User | null> => {
  const user = await userRepository.findOneBy({ id });
  if (!user) return null;
  Object.assign(user, data);
  return await userRepository.save(user);
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const result = await userRepository.delete(id);
  return result.affected !== 0;
};
