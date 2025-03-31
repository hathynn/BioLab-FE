export interface OrderSOPDetailType {
    _id?: string
    order_id: string
    sop_id: string
    quantity: number
    price: number
    subtotal: number
    sop_snapshot: {
      name: string
      description?: string
      image_url?: string
    }
    products: {
      product_id: string
      name: string
      price: number
      quantity: number
      image_url?: string
      description?: string
    }[]
  }