import { IsOptional, IsPositive } from 'class-validator';

export class TodoFilterDto {
  @IsPositive()
  @IsOptional()
  directoryId?: number;
}
