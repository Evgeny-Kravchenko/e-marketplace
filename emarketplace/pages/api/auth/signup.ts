import { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import User from 'shared/api/typicode/users';
import { db } from 'shared/config';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, password } = req.body;

  if (!name || !email.includes('@') || !password || password.trim().length < 5) {
    res.status(422).send('Validation error');
    return;
  }

  await db.connect();
  const existingUser = await (User as any).findOne({ email });
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

export default handler;
