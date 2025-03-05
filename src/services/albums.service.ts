import { APIRequestContext } from '@playwright/test';
import { BaseService } from './base.service';
import { Album } from '../types/api.types';
import { AlbumSchema } from '../schemas/api.schemas';

export class AlbumsService extends BaseService {
  constructor(request: APIRequestContext) {
    super(request, '/albums');
  }

  async getAllAlbums(): Promise<Album[]> {
    return this.getAll(AlbumSchema);
  }

  async getAlbumById(id: number): Promise<Album> {
    return this.getById(id, AlbumSchema);
  }

  async getAlbumsByUserId(userId: number): Promise<Album[]> {
    return this.getByFilter('userId', userId, AlbumSchema);
  }

  async createAlbum(album: Partial<Album>): Promise<Album> {
    return this.create(album, AlbumSchema);
  }

  async updateAlbum(id: number, album: Partial<Album>): Promise<Album> {
    return this.update(id, album, AlbumSchema);
  }

  async deleteAlbum(id: number): Promise<void> {
    return this.delete(id);
  }
} 