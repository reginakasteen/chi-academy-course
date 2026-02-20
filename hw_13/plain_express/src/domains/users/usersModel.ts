import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user!: string;

  @Column({ unique: true, nullable: true })
  email?: string;
}
