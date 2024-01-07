import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}
  // getAllPosts() {
  //   return this.posts;
  // }
  // getPostsWithFilters(filterDto: GetPostsFilterDto) {
  //   const { search } = filterDto;
  //   let posts = this.getAllPosts();
  //   if (search) {
  //     posts = posts.filter((post) => {
  //       if (
  //         post.title.toLocaleLowerCase().includes(search) ||
  //         post.description.toLocaleLowerCase().includes(search)
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return posts;
  // }

  async getPostById(id: string) {
    const found = await this.postsRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException(`Post with ID "${id} not found"`);
    }

    return found;
  }

  // getPostById(id: string) {
  //   return this.posts.find((post) => post.id === id);
  // }
  // createPost(createPostDto: CreatePostDto) {
  //   const { title, description } = createPostDto;
  //   const post: Post = {
  //     id: uuid(),
  //     title,
  //     description,
  //   };
  //   this.posts.push(post);
  //   return post;
  // }
  // deletePost(id: string) {
  //   this.posts = this.posts.filter((task) => task.id !== id);
  // }
  // updatePostTitle(id: string, title: string) {
  //   const post = this.getPostById(id);
  //   post.title = title;
  //   return post;
  // }
}
