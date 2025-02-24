import { PostCategoryType } from "./postCategory.type";

export enum PostStatus {
  PUBLISHED,
  DRAFT,
}

export interface PostType {
  _id?: string
  title: string
  banner: string
  category: PostCategoryType[]
  created_date: Date
  status: PostStatus
  post_contents: string
}
