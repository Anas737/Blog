import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';
import { RegisterUserDTO } from 'src/user/dto/register-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post()
  async register(@Body() userData: RegisterUserDTO) {
    const user = await this.userService.create(userData);

    return user.toResponse();
  }

  @Post('login')
  async login(@Body() userData: LoginUserDTO) {
    const user = await this.authService.login(userData);

    const payload = { email: user.email };
    const token = this.authService.signPayload(payload);

    return user.toResponse(token);
  }
}
