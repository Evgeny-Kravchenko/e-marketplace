export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: string;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
}

export interface DeliveiryAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentMethod {
  value: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  _id?: string;
}

export interface Order {
  user: unknown;
  orderItems: { orderItem: Product; count: number }[];
  shippingAddress: DeliveiryAddress;
  paymentMethod: PaymentMethod;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  paidAt?: Date;
  deliveredAt?: Date;
  _id?: string;
  isDelivered?: boolean;
  isPaid?: boolean;
}

export interface SignUp {
  name: string;
  email: string;
  password: string;
}
