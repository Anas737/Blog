import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { PostDocument } from './schemas/post.schema';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,
  ) {}

  throwCommentDoesntExist() {
    throw new HttpException('Comment does not exist', HttpStatus.NOT_FOUND);
  }

  async findOne(commentId: string): Promise<CommentDocument> {
    const comment = await this.commentModel.findById(commentId);

    if (!comment) this.throwCommentDoesntExist();

    return comment;
  }

  async findByPost(postId: string): Promise<CommentDocument[]> {
    return this.commentModel
      .find({ post: postId })
      .populate('commenter', 'username image');
  }

  async create(
    commenter: UserDocument,
    post: PostDocument,
    commentData: CreateCommentDTO,
  ): Promise<CommentDocument> {
    const newComment = new this.commentModel(commentData);
    newComment.commenter = commenter.id;
    newComment.post = post.id;

    post.comments.push(newComment.id);
    await post.save();

    commenter.comments.push(newComment.id);
    await commenter.save();

    return newComment.save();
  }

  async update(
    commentId: string,
    commentData: CreateCommentDTO,
  ): Promise<CommentDocument> {
    const toUpdate = await this.findOne(commentId);

    const updated = Object.assign(toUpdate, commentData);

    return updated.save();
  }

  async delete(commentId: string): Promise<CommentDocument> {
    const toDelete = await this.findOne(commentId);

    return toDelete.deleteOne();
  }
}
