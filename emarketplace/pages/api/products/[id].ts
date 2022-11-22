import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'shared/config';
import Product from 'shared/api/typicode/products';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await db.connect();
  const product = await (Product as any).findOne({ id: req.query.id });
  await db.disconnect();
  res.send(product);
};

export default handler;
