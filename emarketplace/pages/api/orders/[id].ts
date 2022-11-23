import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Order from 'shared/api/typicode/orders';
import { db } from 'shared/config';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Signin required');
  }

  db.connect();
  const order = await (Order as any).findById(req.query.id);
  db.disconnect();

  res.send(order);
};

export default handler;
