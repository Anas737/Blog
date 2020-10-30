import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';
import { RegisterUserDTO } from 'src/user/dto/register-user.dto';
import { UsersService } from 'src/user/users.service';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async register(@Body('user') userData: RegisterUserDTO) {
    const user = await this.userService.create(userData);

    return user.toResponse();
  }

  @Post('login')
  async login(@Body('user') userData: LoginUserDTO) {
    const user = await this.userService.findByPayload(userData);

    const payload = { email: user.email };
    const token = this.authService.signPayload(payload);

    return user.toResponse(token);
  }
}
