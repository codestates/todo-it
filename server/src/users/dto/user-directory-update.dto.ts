import { Directory } from '../../directories/entities/directory.entity';
import { PartialType, PickType } from '@nestjs/mapped-types';

export class UserDirectoryUpdateDto extends PartialType(
  PickType(Directory, ['name'])
) {}
