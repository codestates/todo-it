import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserUpdateDto extends PartialType(PickType(User, ['nickname'])) {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  newPassword: string | undefined;
}
