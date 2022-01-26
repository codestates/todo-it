import { Directory } from '../../directories/entities/directory.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Todo extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty()
  content: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  @IsBoolean()
  isDone: boolean;

  @Column({ type: 'varchar', nullable: false, default: '' })
  @IsString()
  comment: string;

  @Column({ type: 'timestamp', nullable: true })
  @IsDate()
  deadline: Date | null;

  @ManyToOne(() => User, (user) => user.todos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Directory, (directory) => directory.todos, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  directory: Directory | null;
}
