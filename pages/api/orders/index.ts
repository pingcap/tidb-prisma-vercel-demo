import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma'

const DEFAULT_PAGE_NUM = 1;
const DEFAULT_PAGE_SIZE = 8;

const orderListHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method === 'GET') {
    try {
      res.status(200).json(await getOrderList(req));
    } catch (err:any) {
      console.error(err)
      res.status(500).json({
        message: err.message
      })
    }
  } else {
    res.status(401).json({
      message: `HTTP method ${req.method} is not supported.`
    });
  }
}

async function getOrderList(req: NextApiRequest) {
  const query = parseOrderListQuery(req.query, true, true);
  const orders: any[] = await prisma.order.findMany({
    ...query,
    include: {
      user: {
        select: {
            id: true,
            nickname: true
        }
      },
      book: true
    },
  });

  // Counting.
  const total = await prisma.order.count(parseOrderListQuery(req.query));

  return {
    content: orders,
    total: total
  }
}

function parseOrderListQuery(query: any, sorting: boolean = false, paging: boolean = false) {
  const q:any = {}

  q.where = {};
  // TODO: get user ID for context.
  if (typeof query.userId === 'string') {
    q.where.userId = BigInt(query.userId);
  } else {
    throw new Error('Must provide userId.');
  }

  // Paging.
  if (paging) {
    let page = DEFAULT_PAGE_NUM;
    let size = DEFAULT_PAGE_SIZE;
    if (typeof query.page === 'string') {
      page = parseInt(query.page);
    }
    if (typeof query.size === 'string') {
      size = parseInt(query.size);
    }
    if (size < 0 || size > 100) {
      throw new Error('Parameter `size` must between 0 and 100.');
    }
    q.take = size;
    q.skip = (page - 1) * size;
  }

  return q;
}

export default orderListHandler;
