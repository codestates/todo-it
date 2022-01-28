import { Todo } from 'src/todos/entities/todo.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Directory extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => User, (user) => user.todos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Todo, (todo) => todo.directory, {
    nullable: false,
    cascade: true,
  })
  todos: Todo[];
}
