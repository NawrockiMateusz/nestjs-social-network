import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(@Query() filterDto: GetPostsFilterDto) {
    return this.postsService.getPosts(filterDto);
  }

  @Get('/:id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Post()
  createPost(@Body() CreatePostDto: CreatePostDto) {
    return this.postsService.createPost(CreatePostDto);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }

  @Patch('/:id/title')
  updatePostStatus(@Param('id') id: string, @Body('title') title: string) {
    return this.postsService.updatePostTitle(id, title);
  }
}
