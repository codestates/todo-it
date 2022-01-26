import { Todo } from 'src/todos/entities/todo.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Directory extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Todo, (todo) => todo.directory, {
    nullable: false,
  })
  todos: Todo[];
}
