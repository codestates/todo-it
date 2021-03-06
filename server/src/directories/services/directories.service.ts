import { UserDirectoryUpdateDto } from './../../users/dto/user-directory-update.dto';
import { Directory } from '../entities/directory.entity';
import { UserDirectoryAddDto } from '../../users/dto/user-directory-add.dto';
import { UserRepository } from '../../users/repositories/user.repository';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { pickDirectoryData } from 'src/common/utils/pick-directory-data.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DirectoriesService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectRepository(Directory)
    private readonly directoryRepository: Repository<Directory>
  ) {}

  async getDirectoriesByUserId(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId, {
      relations: ['directories'],
    });
    return user.directories.map(pickDirectoryData);
  }

  async addDirectoryByUserId(userId: number, { name }: UserDirectoryAddDto) {
    return pickDirectoryData(
      await this.directoryRepository.save({
        name,
        user: await this.userRepository.findOneOrFail(userId),
      })
    );
  }

  async checkAndUpdateDirectoryByDirectoryId(
    directoryId: number,
    { name }: UserDirectoryUpdateDto,
    userId: number
  ) {
    const directory = await this.directoryRepository.findOneOrFail(
      directoryId,
      {
        relations: ['user'],
      }
    );
    if (directory.user.id !== userId) {
      throw new ForbiddenException('자신의 Directory가 아닙니다.');
    }
    if (name !== undefined) {
      directory.name = name;
    }
    return pickDirectoryData(await directory.save());
  }

  async checkAndDeleteDirectoryByDirectoryId(
    directoryId: number,
    userId: number
  ) {
    const directory = await this.directoryRepository.findOneOrFail(
      directoryId,
      {
        relations: ['user'],
      }
    );
    if (directory.user.id !== userId) {
      throw new ForbiddenException('자신의 Directory가 아닙니다.');
    }
    directory.remove();
  }
}
