import { NextApiRequest, NextApiResponse } from 'next';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  res.status(200).json({ up: true })
}
