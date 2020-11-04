import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './decorators/user.decorator';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findProfile(
    @User() user: UserDocument,
    @Param('username') toFindUsername,
    @Res() res,
  ) {
    if (user.username === toFindUsername) {
      res.redirect('/api/user');
    }

    const foundUser = await this.usersService.findOne(toFindUsername);

    const profile = foundUser.toProfile(user.username);

    res.send(profile);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/posts')
  async findProfilePosts(@Param('username') toFindPostForUsername) {
    return await this.usersService.findPosts(toFindPostForUsername);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':username/follow')
  async followProfile(
    @User() user: UserDocument,
    @Param('username') tofollowUsername: string,
  ) {
    const followedUser = await this.usersService.follow(user, tofollowUsername);

    return followedUser.toProfile(user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username/unfollow')
  async unfollowProfile(
    @User() user: UserDocument,
    @Param('username') toUnfollowUsername: string,
  ) {
    const unfollowedUser = await this.usersService.unfollow(
      user,
      toUnfollowUsername,
    );

    return unfollowedUser.toProfile(user.username);
  }
}
