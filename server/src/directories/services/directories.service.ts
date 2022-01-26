import { UserRepository } from '../../users/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { pickDirectoryData } from 'src/common/utils/pick-directory-data.util';

@Injectable()
export class DirectoriesService {
  constructor(private readonly userRepository: UserRepository) {}

  async getDirectoriesByUserId(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId, {
      relations: ['directories'],
    });
    return user.directories.map(pickDirectoryData);
  }
}
