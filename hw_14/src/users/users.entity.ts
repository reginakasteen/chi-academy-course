import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Exhibit } from "../exhibits/exhibits.entity";
import { Comment } from "../comments/comments.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @OneToMany(() => Exhibit, (exhibit) => exhibit.user)
  exhibits!: Exhibit[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];
}