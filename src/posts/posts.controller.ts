import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }
  @Post()
  createPost(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.postsService.createPost(title, description);
  }
}
