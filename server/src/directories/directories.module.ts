import { UserRepository } from '../users/repositories/user.repository';
import { Directory } from './entities/directory.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectoriesService } from './services/directories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Directory, UserRepository])],
  providers: [DirectoriesService],
  exports: [DirectoriesService],
})
export class DirectoriesModule {}
