import { Todo } from '../../todos/entities/todo.entity';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @IsEmail()
  @IsNotEmpty()
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', unique: true, nullable: false })
  nickname: string;

  @IsBoolean()
  @Column({ type: 'boolean', nullable: false, default: false })
  isEmailVerified: boolean;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
