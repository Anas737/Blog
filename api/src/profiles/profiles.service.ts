import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  throwUserDoesntExit() {
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async findOne(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      username,
    });

    if (!user) this.throwUserDoesntExit();

    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async follow(
    user: UserDocument,
    toFollowUsername: string,
  ): Promise<UserDocument> {
    if (user.username === toFollowUsername)
      throw new HttpException(
        "You can't follow yourself",
        HttpStatus.BAD_REQUEST,
      );

    const toFollow = await this.findOne(toFollowUsername);

    toFollow.followers.push({
      id: user.id,
      username: user.username,
      bio: user.bio,
      image: user.image,
    });

    user.followings.push({
      id: toFollow.id,
      username: toFollow.username,
      bio: toFollow.bio,
      image: toFollow.image,
    });

    await user.save();

    return toFollow.save();
  }

  async unfollow(
    user: UserDocument,
    toUnfollowUsername: string,
  ): Promise<UserDocument> {
    if (user.username === toUnfollowUsername)
      throw new HttpException(
        "You can't unfollow yourself",
        HttpStatus.BAD_REQUEST,
      );

    const toUnfollow = await this.findOne(toUnfollowUsername);

    toUnfollow.followers = toUnfollow.followers.filter(follower => {
      return follower.username !== user.username;
    });

    user.followings = user.followings.filter(following => {
      return following.username !== toUnfollow.username;
    });

    await user.save();

    return toUnfollow.save();
  }
}
