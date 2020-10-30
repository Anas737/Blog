import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({
    required: true,
  })
  content: string;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'Post',
  })
  post: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  commenter: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
