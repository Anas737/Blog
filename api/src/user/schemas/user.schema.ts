import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  HookNextFunction,
  Types,
  Schema as MongooseSchema,
} from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Profile } from './types/profile';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default: 'No bio',
  })
  bio: string;

  @Prop({
    default: null,
  })
  image: string;

  @Prop()
  followers: Profile[];

  @Prop()
  followings: Profile[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Post' }])
  posts: Types.ObjectId[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }])
  comments: Types.ObjectId[];

  toResponse: any;
  toProfile: any;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toResponse = function(token = '') {
  const response = {
    email: this.email,
    username: this.username,
    bio: this.bio,
    image: this.image,
  };

  if (token) {
    response['token'] = token;
  }

  return response;
};

UserSchema.methods.toProfile = function(currentUsername: string) {
  const response = {
    profile: {
      username: this.username,
      bio: this.bio,
      image: this.image,
      following: this.followers.some(
        follower => follower.username === currentUsername,
      ),
    },
  };

  return response;
};

UserSchema.pre('save', async function(next: HookNextFunction) {
  try {
    if (this.isModified('password')) {
      const hashed = await bcrypt.hash(this['password'], 10);
      this['password'] = hashed;
    }

    return next();
  } catch (error) {
    return next(error);
  }
});
