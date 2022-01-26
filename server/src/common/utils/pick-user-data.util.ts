import { User } from 'src/users/entities/user.entity';

export const pickUserData = (user: User) => ({
  id: user.id,
  email: user.email,
  nickname: user.nickname,
});
