import { NextApiRequest, NextApiResponse } from 'next';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { db } from 'shared/config';
import { Product as IProduct } from 'shared/api/models';
import User from 'shared/api/typicode/users';
import Product from 'shared/api/typicode/products';

export interface getProductsReturn {
  data: IProduct[];
}

const mockProductData = new Array(20).fill(null).map(() => ({
  id: faker.datatype.uuid(),
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

const users = [
  {
    name: 'John',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'Jane',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
];

const handler = async (_: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await db.connect();
  await User.deleteMany();
  await (User as any).insertMany(users);
  await Product.deleteMany();
  await (Product as any).insertMany(mockProductData);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};

export default handler;
