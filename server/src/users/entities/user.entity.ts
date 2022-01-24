import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @IsEmail()
  @IsNotEmpty()
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', unique: true, nullable: false })
  nickname: string;

  @IsBoolean()
  @Column({ type: 'boolean', nullable: false, default: false })
  isEmailVerified: boolean;
}
