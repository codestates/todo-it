import { Directory } from '../../directories/entities/directory.entity';

export const pickDirectoryData = (directory: Directory) => ({
  id: directory.id,
  name: directory.name,
});
