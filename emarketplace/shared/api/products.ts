import { faker } from '@faker-js/faker';

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

export interface getProductsReturn {
  data: Product[];
}

export const getProducts = (): getProductsReturn => {
  return {
    data: new Array(20).fill(null).map(() => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.product(),
      slug: faker.datatype.uuid(),
      category: faker.commerce.department(),
      image: faker.image.business(),
      price: faker.commerce.price(0, 100),
      brand: faker.commerce.department(),
      rating: faker.datatype.number({ min: 0, max: 10, precision: 0.5 }),
      numReviews: faker.datatype.number({ min: 0, max: 10000, precision: 1 }),
      countInStock: faker.datatype.number({ min: 0, max: 10000, precision: 1 }),
      description: faker.commerce.productDescription(),
    })),
  };
};
