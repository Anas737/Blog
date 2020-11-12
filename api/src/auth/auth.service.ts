import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/payloads/jwt-payload';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';
import { UserDocument } from 'src/user/schemas/user.schema';

import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userData: LoginUserDTO): Promise<UserDocument> {
    const { email, password } = userData;

    const user = await this.userService.findByEmail(email);

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching)
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);

    return user;
  }

  signPayload(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    });
  }

  async validateUser(payload: JwtPayload): Promise<UserDocument> {
    return this.userService.findByPayload(payload);
  }
}
