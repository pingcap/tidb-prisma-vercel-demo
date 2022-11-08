import { NextApiRequest, NextApiResponse } from 'next';

const health =  async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  res.status(200).json({ up: true })
}

export default health;
