import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { RegisterUserDTO } from 'src/user/dto/register-user.dto';
import { JwtPayload } from 'src/auth/payloads/jwt-payload';
import { PostsService } from 'src/post/posts.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly postsService: PostsService,
  ) {}

  throwUserDoesntExit() {
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }
  /*
   * Users methods
   */
  async findOne(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      username,
    });

    if (!user) this.throwUserDoesntExit();

    return user;
  }

  async findByPayload(payload: JwtPayload): Promise<UserDocument> {
    const { email } = payload;

    const user = await this.userModel.findOne({
      email,
    });

    if (!user) this.throwUserDoesntExit();

    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async create(registerUserDTO: RegisterUserDTO): Promise<UserDocument> {
    const { email } = registerUserDTO;

    const user = await this.userModel.findOne({
      email,
    });

    if (user)
      throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);

    const newUser = new this.userModel(registerUserDTO);

    return newUser.save();
  }

  async update(
    toUpdate: UserDocument,
    userData: RegisterUserDTO,
  ): Promise<UserDocument> {
    const updatedUser = Object.assign(toUpdate, userData);

    return updatedUser.save();
  }

  async delete(toDelete: UserDocument): Promise<UserDocument> {
    return toDelete.deleteOne();
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

  /*
   * Posts methods
   */
  async findPosts(username: string) {
    const user = await this.findOne(username);

    return this.postsService.findByAuthor(user.id);
  }
}
