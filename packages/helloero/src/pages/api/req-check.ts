import { NextApiHandler } from 'next';

const requestCheckApiHandler: NextApiHandler = async (req, res) => {
  res.status(200).json({
    headers: req.headers,
    userAgent: req.headers['user-agent'],
    queries: req.query,
    cookies: req.cookies,
  });
};

export default requestCheckApiHandler;
