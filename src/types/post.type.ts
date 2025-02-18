import { PostCategoryType } from "./postCategory.type";
import { PostContentType } from "./postContent.type";

export enum PostStatus {
  PUBLISHED,
  DRAFT,
}

export interface PostType {
  post_id?: string;
  title: string;
  category: PostCategoryType[];
  created_date: Date;
  user_id: string;
  status: PostStatus;
  postContents: PostContentType[];
}
