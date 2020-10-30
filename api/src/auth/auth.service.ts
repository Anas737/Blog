import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/payloads/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  signPayload(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    });
  }

  async validateUser(payload: JwtPayload) {
    const user = await this.usersService.findByPayload(payload);

    return user;
  }
}
