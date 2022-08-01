import prisma from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';

const DEFAULT_PAGE_NUM = 1;
const DEFAULT_PAGE_SIZE = 8;
const SortTypePublishedAt = 'published_at';
const SortTypeAvgRating = 'average_rating';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method === 'GET') {
    try {
      const query = parseBookListQuery(req.query);
      const books = await prisma.books.findMany(query)
      res.status(200).json({
        content: books
      })
    } catch (err:any) {
      console.error(err)
      return res.status(500).json({
        message: err.message
      })
    }
  } else {
    res.status(401)
  }
}

function parseBookListQuery(query: any) {
  let page = DEFAULT_PAGE_NUM;
  let size = DEFAULT_PAGE_SIZE;
  
  // Paging.
  if (typeof query.page === 'string') {
    page = parseInt(query.page);
  }
  if (typeof query.size === 'string') {
    size = parseInt(query.size);
  }
  if (size < 0 || size > 100) {
    throw new Error('param size must between 0 and 100.');
  }
  const skip = (page - 1) * size;
  const q:any = {
    skip: skip,
    take: size
  }

  // Filters.
  if (typeof query.type === 'string') {
    q.where = query.type;
  }

  // Sorting.
  if (typeof query.sort === 'string') {
    if (![SortTypePublishedAt, SortTypeAvgRating].find((s) => s === query.sort)) {
      throw new Error('parameter sort must be `published_at` or `average_rating`');
    }
    q.orderBy = query.sort;
  }

  return q;
}