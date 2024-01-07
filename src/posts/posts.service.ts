import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async getPosts(filterDto: GetPostsFilterDto) {
    const { search } = filterDto;
    const query = this.postsRepository.createQueryBuilder('post');

    if (search) {
      query.andWhere(
        'LOWER(post.title) LIKE LOWER(:search) OR LOWER(post.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const posts = await query.getMany();
    return posts;
  }

  async getPostById(id: string) {
    const found = await this.postsRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException(`Post with ID "${id} not found"`);
    }

    return found;
  }

  async createPost(createPostDto: CreatePostDto) {
    const { title, description } = createPostDto;

    const task = this.postsRepository.create({
      title,
      description,
    });

    await this.postsRepository.save(task);
    return task;
  }

  async deletePost(id: string) {
    const result = await this.postsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID "${id} not found"`);
    }
  }

  async updatePostTitle(id: string, title: string) {
    const post = await this.getPostById(id);
    post.title = title;
    await this.postsRepository.save(post);
    return post;
  }
}
