import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/decorators/user.decorator';
import { PostsService } from './posts.service';
import { UserDocument } from 'src/user/schemas/user.schema';
import { CreatePostDTO } from './dto/create-post.dto';
import { CreateCommentDTO } from './dto/create-comment.dto';

@Controller()
export class PostController {
  constructor(private readonly postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('posts/feed')
  async getFeed(@User() user: UserDocument, @Query() query: any) {
    const feed = await this.postService.findFeed(user, query);

    const response = [];

    feed.forEach(post => {
      response.push(post.toResponse(user.username));
    });

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts')
  async findAll(@User() user: UserDocument) {
    return await this.postService.findByAuthor(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts/:postId')
  async find(@Param('postId') postId: string) {
    return await this.postService.findOne(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('posts/create')
  async create(@User() user: UserDocument, @Body() postData: CreatePostDTO) {
    return await this.postService.create(user, postData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('posts/:postId')
  async update(
    @User() user: UserDocument,
    @Param('postId') postId: string,
    @Body() postData: CreatePostDTO,
  ) {
    return await this.postService.update(user, postId, postData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('posts/:postId')
  async delete(@User() user, @Param('postId') postId: string) {
    return await this.postService.delete(user, postId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts/:postId/comments')
  async findComments(@Param('postId') postId: string) {
    return await this.postService.findComments(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('posts/:postId/comments/create')
  async addComment(
    @User() user: UserDocument,
    @Param('postId') postId: string,
    @Body() comment: CreateCommentDTO,
  ) {
    return await this.postService.addComment(user, postId, comment);
  }

  @UseGuards(JwtAuthGuard)
  @Put('comments/:commentId')
  async updateComment(
    @User() user: UserDocument,
    @Param('commentId') commentId: string,
    @Body() commentData: CreateCommentDTO,
  ) {
    return await this.postService.editComment(user, commentId, commentData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('comments/:commentId')
  async deleteComment(
    @User() user: UserDocument,
    @Param('commentId') commentId: string,
  ) {
    return await this.postService.deleteComment(user, commentId);
  }
}
