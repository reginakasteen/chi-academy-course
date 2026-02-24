import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "../users/users.entity";
import { Exhibit } from "../exhibits/exhibits.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Exhibit, (exhibit) => exhibit.comments, { onDelete: "CASCADE" })
  exhibit!: Exhibit;
}