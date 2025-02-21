
import { CategoryType } from './category.type'
import { BrandType } from './brand.type'

export interface ProductType {
  _id?: string
  name: string
  description?: string
  category?: CategoryType
  image_url?: string[]
  brand: BrandType
  qa?: QAType[]
  unit: string
  price: number
  stock: number
  status?: ProductStatus
  details?: Detail[]
}

export type Detail = {
  title: string
  content: string
}

export type QAType = {
  question: string
  answer: string
}

export enum ProductStatus {
  ACTIVE,
  INACTIVE
}


