import { z } from 'zod';

export const GeoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

export const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: GeoSchema,
});

export const CompanySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: AddressSchema,
  phone: z.string(),
  website: z.string(),
  company: CompanySchema,
});

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number()
});

export const CommentSchema = z.object({
  id: z.number(),
  postId: z.number(),
  name: z.string(),
  email: z.string().email(),
  body: z.string()
});

export const AlbumSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string()
});

export const PhotoSchema = z.object({
  id: z.number(),
  albumId: z.number(),
  title: z.string(),
  url: z.string().url(),
  thumbnailUrl: z.string().url()
});

export const TodoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  completed: z.boolean()
}); 