import { CategoryType } from "./category.type";

export interface ProductType {
  _id?: string;
  name: string;
  description?: string;
  category?: CategoryType[];
  image_url?: string[];
  qa?: QAType[];
}

export type QAType = {
  question: string;
  answer: string;
};
