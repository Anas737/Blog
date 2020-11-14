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
import { User } from 'src/user/decorators/user.decorator';
import { UserDocument } from 'src/user/schemas/user.schema';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findProfile(
    @User() user: UserDocument,
    @Param('username') toFindUsername,
    @Res() res,
  ) {
    if (user.username === toFindUsername) {
      res.redirect('/api/user');

      return;
    }

    const foundUser = await this.profilesService.findOne(toFindUsername);

    const profile = foundUser.toProfile(user.username);

    res.send(profile);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':username/follow')
  async followProfile(
    @User() user: UserDocument,
    @Param('username') tofollowUsername: string,
  ) {
    const followedUser = await this.profilesService.follow(
      user,
      tofollowUsername,
    );

    return followedUser.toProfile(user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username/unfollow')
  async unfollowProfile(
    @User() user: UserDocument,
    @Param('username') toUnfollowUsername: string,
  ) {
    const unfollowedUser = await this.profilesService.unfollow(
      user,
      toUnfollowUsername,
    );

    return unfollowedUser.toProfile(user.username);
  }
}
