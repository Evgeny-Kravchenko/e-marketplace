import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from 'shared/config';
import Order from 'shared/api/typicode/orders';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Signin required');
  }
  await db.connect();
  const order = await (Order as any).findById(req.query.id);
  if (order) {
    if (order.isPaid) {
      res.status(400).send({ message: 'Error: order is already paid' });
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: 'order paid successfully', order: paidOrder });
  } else {
    db.disconnect();
    res.status(404).send({ message: 'Error: order not found' });
  }
};

export default handler;
