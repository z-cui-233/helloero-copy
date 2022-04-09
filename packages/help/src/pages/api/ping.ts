import { NextApiHandler } from 'next';

const pingApiHandler: NextApiHandler = (req, res) => {
  res.status(200).send('pong');
};

export default pingApiHandler;
