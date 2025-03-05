import { test as base } from '@playwright/test';
import { PostsService } from '../../src/services/posts.service';
import { CommentsService } from '../../src/services/comments.service';
import { UsersService } from '../../src/services/users.service';
import { AlbumsService } from '../../src/services/albums.service';
import { PhotosService } from '../../src/services/photos.service';
import { TodosService } from '../../src/services/todos.service';

// Define service fixture types
export type Services = {
  postsService: PostsService;
  commentsService: CommentsService;
  usersService: UsersService;
  albumsService: AlbumsService;
  photosService: PhotosService;
  todosService: TodosService;
};

// Service fixtures
export const serviceFixtures = {
  postsService: async ({ request }, use) => {
    const service = new PostsService(request);
    await use(service);
    service.clearCache();
    service.clearMetrics();
  },

  commentsService: async ({ request }, use) => {
    const service = new CommentsService(request);
    await use(service);
    service.clearCache();
    service.clearMetrics();
  },

  usersService: async ({ request }, use) => {
    const service = new UsersService(request);
    await use(service);
    service.clearCache();
    service.clearMetrics();
  },

  albumsService: async ({ request }, use) => {
    const service = new AlbumsService(request);
    await use(service);
    service.clearCache();
    service.clearMetrics();
  },

  photosService: async ({ request }, use) => {
    const service = new PhotosService(request);
    await use(service);
    service.clearCache();
    service.clearMetrics();
  },

  todosService: async ({ request }, use) => {
    const service = new TodosService(request);
    await use(service);
    service.clearCache();
    service.clearMetrics();
  }
}; 