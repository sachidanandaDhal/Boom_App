// types.ts
export interface Video {
  _id: string;
  title: string;
  likes: number;
  createdAt: string;
  contentType: string;
  videoUrl: string;
  thumbnailUrl?: string; // Optional if you add thumbnails later
}


export interface User {
  _id: string;
  email: string;
}
