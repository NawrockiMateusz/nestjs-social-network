import { Injectable } from '@nestjs/common';
import { Post } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  getAllPosts() {
    return this.posts;
  }
  createPost(title: string, description: string) {
    const post: Post = {
      id: uuid(),
      title,
      description,
    };

    this.posts.push(post);
    return post;
  }
}
