import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { User } from "../users/users.entity";
import { Comment } from "../comments/comments.entity";

@Entity()
export class Exhibit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  imageUrl!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.exhibits, { onDelete: "CASCADE" })
  user!: User;

  @OneToMany(() => Comment, (comment) => comment.exhibit)
  comments!: Comment[];
}