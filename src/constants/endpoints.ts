//USER
export enum USER_API {
  REGISTER = "register",
  LOGIN = "login",
  REFRESH = "refresh",
}

export enum BRAND {
  DEFAULT = "brands",
  FEATURE = "feature",
}

export enum CATEGORY {
  DEFAULT = "categories",
}

export enum PRODUCT {
  DEFAULT = "products",
}

export enum POST {
  DEFAULT = "posts",
}

export enum POST_CATEGORY {
  DEFAULT = "post-categories",
}

export enum ORDER {
  DEFAULT = "orders",
  GET_ALL = "orders/all",
  STATUS = "status",
}

export enum ORDER_DETAIL {
  DEFAULT = "order-details",
}

export enum PAYMENT {
  DEFAULT = "payments",
  CREATE = "create-payment",
  WEBHOOK = "payos-webhook",
}

export enum SOP {
  DEFAULT = "sops",
}

export enum SOP_ORDER {
  DEFAULT = "/sop-orders",
  PAYMENT = "/sop-orders/payment",
  SUBSCRIPTIONS = "/sop-orders/subscriptions",
  PENDING_DELIVERIES = "/sop-orders/pending-deliveries",
}
