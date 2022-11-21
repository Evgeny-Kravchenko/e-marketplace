import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from 'shared/config';
import User from 'entities/user/model/User';

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

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await db.connect();
  await User.deleteMany();
  await (User as any).insertMany(users);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};

export default handler;
