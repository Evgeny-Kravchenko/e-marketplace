import { faker } from '@faker-js/faker';

import { Product } from './models';

export interface getProductsReturn {
  data: Product[];
}

const mockData = new Array(20).fill(null).map((_, index) => ({
  id: `${index + 1}`,
  name: faker.commerce.product(),
  slug: faker.datatype.uuid(),
  category: faker.commerce.department(),
  image: faker.image.technics(640, 480, true),
  price: faker.commerce.price(0, 100),
  brand: faker.commerce.department(),
  rating: faker.datatype.number({ min: 0, max: 10, precision: 0.5 }),
  numReviews: faker.datatype.number({ min: 0, max: 10000, precision: 1 }),
  countInStock: faker.datatype.number({ min: 0, max: 10, precision: 1 }),
  description: faker.commerce.productDescription(),
}));

export const getProducts = async (): Promise<getProductsReturn> => {
  return new Promise((res) => {
    const timer = setTimeout(() => {
      res({
        data: mockData,
      });
      clearTimeout(timer);
    }, 500);
  });
};
