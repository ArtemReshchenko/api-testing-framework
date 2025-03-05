import { APIRequestContext } from '@playwright/test';
import { BaseService } from './base.service';
import { Photo } from '../types/api.types';
import { PhotoSchema } from '../schemas/api.schemas';

export class PhotosService extends BaseService {
  constructor(request: APIRequestContext) {
    super(request, '/photos');
  }

  async getAllPhotos(): Promise<Photo[]> {
    return this.getAll(PhotoSchema);
  }

  async getPhotoById(id: number): Promise<Photo> {
    return this.getById(id, PhotoSchema);
  }

  async getPhotosByAlbumId(albumId: number): Promise<Photo[]> {
    return this.getByFilter('albumId', albumId, PhotoSchema);
  }

  async createPhoto(photo: Partial<Photo>): Promise<Photo> {
    return this.create(photo, PhotoSchema);
  }

  async updatePhoto(id: number, photo: Partial<Photo>): Promise<Photo> {
    return this.update(id, photo, PhotoSchema);
  }

  async deletePhoto(id: number): Promise<void> {
    return this.delete(id);
  }
} 