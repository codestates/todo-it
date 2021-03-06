import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UserRegisterDto extends IntersectionType(
  PickType(User, ['email', 'password']),
  PartialType(PickType(User, ['nickname']))
) {}
