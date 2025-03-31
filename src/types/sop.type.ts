import { ProductType } from "./product.type";

export interface SOPType {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  combo: ProductType[];
}
