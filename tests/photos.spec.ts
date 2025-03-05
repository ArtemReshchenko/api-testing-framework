import { test, expect } from '@playwright/test';
import { PhotosService } from '../src/services/photos.service';
import { Photo } from '../src/types/api.types';

let photosService: PhotosService;

test.beforeEach(async ({ request }) => {
  photosService = new PhotosService(request);
});

test.describe('Photos API Tests', () => {
  test('GET /photos - should return all photos', async () => {
    const photos = await photosService.getAllPhotos();
    
    expect(Array.isArray(photos)).toBeTruthy();
    expect(photos.length).toBeGreaterThan(0);
    
    const firstPhoto = photos[0];
    expect(firstPhoto).toHaveProperty('id');
    expect(firstPhoto).toHaveProperty('title');
    expect(firstPhoto).toHaveProperty('url');
    expect(firstPhoto).toHaveProperty('thumbnailUrl');
    expect(firstPhoto).toHaveProperty('albumId');
  });

  test('GET /photos/:id - should return a specific photo', async () => {
    const photoId = 1;
    const photo = await photosService.getPhotoById(photoId);
    
    expect(photo.id).toBe(photoId);
    expect(typeof photo.title).toBe('string');
    expect(typeof photo.url).toBe('string');
    expect(typeof photo.thumbnailUrl).toBe('string');
    expect(typeof photo.albumId).toBe('number');
  });

  test('GET /photos?albumId=:id - should return photos for a specific album', async () => {
    const albumId = 1;
    const photos = await photosService.getPhotosByAlbumId(albumId);
    
    expect(Array.isArray(photos)).toBeTruthy();
    expect(photos.length).toBeGreaterThan(0);
    photos.forEach(photo => {
      expect(photo.albumId).toBe(albumId);
    });
  });

  test('POST /photos - should create a new photo', async () => {
    const newPhoto: Partial<Photo> = {
      title: 'Test Photo',
      url: 'https://example.com/photo.jpg',
      thumbnailUrl: 'https://example.com/thumbnail.jpg',
      albumId: 1
    };

    const createdPhoto = await photosService.createPhoto(newPhoto);
    
    expect(createdPhoto.id).toBeDefined();
    expect(createdPhoto.title).toBe(newPhoto.title);
    expect(createdPhoto.url).toBe(newPhoto.url);
    expect(createdPhoto.thumbnailUrl).toBe(newPhoto.thumbnailUrl);
    expect(createdPhoto.albumId).toBe(newPhoto.albumId);
  });

  test('PUT /photos/:id - should update an existing photo', async () => {
    const photoId = 1;
    const updatedPhoto: Partial<Photo> = {
      title: 'Updated Test Photo',
      url: 'https://example.com/updated-photo.jpg',
      thumbnailUrl: 'https://example.com/updated-thumbnail.jpg',
      albumId: 1
    };

    const modifiedPhoto = await photosService.updatePhoto(photoId, updatedPhoto);
    
    expect(modifiedPhoto.id).toBe(photoId);
    expect(modifiedPhoto.title).toBe(updatedPhoto.title);
    expect(modifiedPhoto.url).toBe(updatedPhoto.url);
    expect(modifiedPhoto.thumbnailUrl).toBe(updatedPhoto.thumbnailUrl);
  });

  test('DELETE /photos/:id - should delete a photo', async () => {
    const photoId = 1;
    await photosService.deletePhoto(photoId);
  });
}); 