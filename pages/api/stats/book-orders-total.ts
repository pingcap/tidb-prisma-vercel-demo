import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma'

const bookOrdersTotalHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method === 'GET') {
	res.status(200).json(await getBookOrderTotal(req));
  } else {
    res.status(401).json({
      message: `HTTP method ${req.method} is not supported.`
    });
  }
}

async function getBookOrderTotal(req: NextApiRequest) {
	const total = await prisma.order.count();

	return {
		orders: total
	}
}

export default bookOrdersTotalHandler;
