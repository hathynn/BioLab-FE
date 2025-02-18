export enum ContentType {
  TEXT,
  IMAGE,
}

export interface PostContentType {
  content: string;
  type: ContentType;
}
