export class UserResponseDto {
  id!: number;
  username!: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}