import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './decorators/user.decorator';
import { RegisterUserDTO } from './dto/register-user.dto';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(@User() user: UserDocument) {
    return user.toResponse();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@User() user: UserDocument, @Body() userData: RegisterUserDTO) {
    const updatedUser: UserDocument = await this.usersService.update(
      user,
      userData,
    );

    return updatedUser.toResponse();
  }
}
