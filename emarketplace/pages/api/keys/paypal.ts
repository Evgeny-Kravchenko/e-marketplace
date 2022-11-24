import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Signin required');
  }

  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
};

export default handler;
