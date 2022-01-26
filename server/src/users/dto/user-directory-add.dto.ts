import { Directory } from '../../directories/entities/directory.entity';
import { PickType } from '@nestjs/mapped-types';

export class UserDirectoryAddDto extends PickType(Directory, ['name']) {}
