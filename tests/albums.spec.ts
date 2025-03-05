import { test, expect } from '@playwright/test';
import { AlbumsService } from '../src/services/albums.service';
import { Album } from '../src/types/api.types';

let albumsService: AlbumsService;

test.beforeEach(async ({ request }) => {
  albumsService = new AlbumsService(request);
});

test.describe('Albums API Tests', () => {
  test('GET /albums - should return all albums', async () => {
    const albums = await albumsService.getAllAlbums();
    
    expect(Array.isArray(albums)).toBeTruthy();
    expect(albums.length).toBeGreaterThan(0);
    
    const firstAlbum = albums[0];
    expect(firstAlbum).toHaveProperty('id');
    expect(firstAlbum).toHaveProperty('title');
    expect(firstAlbum).toHaveProperty('userId');
  });

  test('GET /albums/:id - should return a specific album', async () => {
    const albumId = 1;
    const album = await albumsService.getAlbumById(albumId);
    
    expect(album.id).toBe(albumId);
    expect(typeof album.title).toBe('string');
    expect(typeof album.userId).toBe('number');
  });

  test('GET /albums?userId=:id - should return albums for a specific user', async () => {
    const userId = 1;
    const albums = await albumsService.getAlbumsByUserId(userId);
    
    expect(Array.isArray(albums)).toBeTruthy();
    expect(albums.length).toBeGreaterThan(0);
    albums.forEach(album => {
      expect(album.userId).toBe(userId);
    });
  });

  test('POST /albums - should create a new album', async () => {
    const newAlbum: Partial<Album> = {
      title: 'Test Album',
      userId: 1
    };

    const createdAlbum = await albumsService.createAlbum(newAlbum);
    
    expect(createdAlbum.id).toBeDefined();
    expect(createdAlbum.title).toBe(newAlbum.title);
    expect(createdAlbum.userId).toBe(newAlbum.userId);
  });

  test('PUT /albums/:id - should update an existing album', async () => {
    const albumId = 1;
    const updatedAlbum: Partial<Album> = {
      title: 'Updated Test Album',
      userId: 1
    };

    const modifiedAlbum = await albumsService.updateAlbum(albumId, updatedAlbum);
    
    expect(modifiedAlbum.id).toBe(albumId);
    expect(modifiedAlbum.title).toBe(updatedAlbum.title);
    expect(modifiedAlbum.userId).toBe(updatedAlbum.userId);
  });

  test('DELETE /albums/:id - should delete an album', async () => {
    const albumId = 1;
    await albumsService.deleteAlbum(albumId);
  });
}); 