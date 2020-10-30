import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'src/post/schemas/post.schema';
import { CreatePostDTO } from 'src/post/dto/create-post.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDocument } from 'src/user/schemas/user.schema';
import { CommentsService } from './comments.service';
import { CommentDocument } from './schemas/comment.schema';
import { CreateCommentDTO } from './dto/create-comment.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    private readonly commentsService: CommentsService,
  ) {}

  /*
   * Exceptions & verifications
   */
  throwPostDoesNotExist() {
    throw new HttpException('Post does not exist', HttpStatus.NOT_FOUND);
  }

  verifyPostModificationRights(user: UserDocument, postId: string) {
    if (user.posts.every(_postId => String(_postId) !== postId))
      throw new HttpException(
        'This post does not belong to this user',
        HttpStatus.UNAUTHORIZED,
      );
  }

  verifyCommentModificationRights(user: UserDocument, commentId: string) {
    if (user.comments.every(_commentId => String(_commentId) !== commentId))
      throw new HttpException(
        'This comment does not belong to this user',
        HttpStatus.UNAUTHORIZED,
      );
  }

  /*
   * Posts methods
   */
  async findOne(postId: string): Promise<PostDocument> {
    const post = await this.postModel.findById(postId);

    if (!post) this.throwPostDoesNotExist();

    return post;
  }

  async findByAuthor(authorId: string): Promise<PostDocument[]> {
    return this.postModel.find({ author: authorId });
  }

  async findAll(): Promise<PostDocument[]> {
    return this.postModel.find().populate('author', 'username image');
  }

  async findFeed(user: UserDocument, query: any): Promise<PostDocument[]> {
    const followings = user.followings;

    if (followings.length === 0) return [];

    const ids = followings.map(following => following.id);

    return this.postModel
      .find({
        author: {
          $in: ids,
        },
      })
      .sort({ createdAt: 'DESC' })
      .skip(parseInt(query.offset))
      .limit(parseInt(query.limit));
  }

  async create(
    author: UserDocument,
    postData: CreatePostDTO,
  ): Promise<PostDocument> {
    const newPost = new this.postModel(postData);
    newPost.author = author.id;

    author.posts.push(newPost.id);
    await author.save();

    return newPost.save();
  }

  async update(
    author: UserDocument,
    postId: string,
    postData: CreatePostDTO,
  ): Promise<PostDocument> {
    this.verifyPostModificationRights(author, postId);

    const toUpdate = await this.findOne(postId);

    const updatedPost = Object.assign(toUpdate, postData);

    return updatedPost.save();
  }

  async delete(author: UserDocument, postId: string): Promise<PostDocument> {
    this.verifyPostModificationRights(author, postId);

    const toDelete = await this.findOne(postId);

    return toDelete.deleteOne();
  }

  /*
   * Comments methods
   */
  async addComment(
    commenter: UserDocument,
    postId: string,
    commentData: CreateCommentDTO,
  ): Promise<CommentDocument> {
    const post = await this.findOne(postId);

    return this.commentsService.create(commenter, post, commentData);
  }

  async editComment(
    commenter: UserDocument,
    commentId: string,
    commentData: CreateCommentDTO,
  ): Promise<CommentDocument> {
    this.verifyCommentModificationRights(commenter, commentId);

    return this.commentsService.update(commentId, commentData);
  }

  async deleteComment(
    commenter: UserDocument,
    commentId: string,
  ): Promise<CommentDocument> {
    this.verifyCommentModificationRights(commenter, commentId);

    return this.commentsService.delete(commentId);
  }

  async findComments(postId: string): Promise<CommentDocument[]> {
    await this.findOne(postId);

    return this.commentsService.findByPost(postId);
  }
}
