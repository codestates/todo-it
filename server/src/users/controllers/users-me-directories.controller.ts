import { UserDirectoryAddDto } from '../dto/user-directory-add.dto';
import { DirectoriesService } from '../../directories/services/directories.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtValidatePayload } from 'src/auth/jwt/jwt-validate.payload';

@Controller('users/me/directories')
@UseGuards(JwtAuthGuard)
export class UsersMeDirectoriesController {
  constructor(private readonly directoriesService: DirectoriesService) {}

  @Get()
  getMyDirectories(@CurrentUser() { userId }: JwtValidatePayload) {
    return this.directoriesService.getDirectoriesByUserId(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addMyDirectory(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Body() userDirectoryAddDto: UserDirectoryAddDto
  ) {
    return this.directoriesService.addDirectoryByUserId(
      userId,
      userDirectoryAddDto
    );
  }
}
