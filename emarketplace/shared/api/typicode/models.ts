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
