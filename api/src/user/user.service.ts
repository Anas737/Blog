import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { RegisterUserDTO } from 'src/user/dto/register-user.dto';
import { JwtPayload } from 'src/auth/payloads/jwt-payload';
import { Post, PostDocument } from 'src/posts/schemas/post.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

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

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      email,
    });

    if (!user) this.throwUserDoesntExit();

    return user;
  }

  async findByPayload(payload: JwtPayload): Promise<UserDocument> {
    const { email } = payload;

    return this.findByEmail(email);
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
}
