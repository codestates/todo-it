import { User } from 'src/users/entities/user.entity';
import { PickType } from '@nestjs/mapped-types';

export class LoginRequestDto extends PickType(User, ['email', 'password']) {}
