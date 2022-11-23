import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from 'shared/config';
import Order from 'shared/api/typicode/orders';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Signin required');
  }

  const { _id } = session;

  await db.connect();
  const newOrder = new Order({ ...req.body, user: _id });
  const order = await newOrder.save();
  await db.disconnect();
  res.status(201).send(order);
};

export default handler;
