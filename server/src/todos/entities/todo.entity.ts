import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Todo extends CommonEntity {
  @Column({ type: 'varchar', nullable: false, default: '' })
  @IsNotEmpty()
  content: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isDone: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date | null;

  @Column({ type: 'varchar', nullable: true })
  comment: string | null;

  @ManyToOne(() => User, (user) => user.todos, { nullable: false })
  user: User;
}
