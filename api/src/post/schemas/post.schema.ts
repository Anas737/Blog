import { InternalServerErrorException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  author: Types.ObjectId;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }])
  comments: Types.ObjectId[];

  toResponse: any;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.methods.toResponse = function(currentUsername: string) {
  const response = {
    title: this.title,
    content: this.content,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: {
      username: this.author.username,
      image: this.author.image,
      following: this.author.followers.some(
        follower => follower.username === currentUsername,
      ),
    },
    comments: this.comments,
  };

  return response;
};
