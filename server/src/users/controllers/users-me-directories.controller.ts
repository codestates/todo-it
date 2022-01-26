import { DirectoriesService } from '../../directories/services/directories.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
