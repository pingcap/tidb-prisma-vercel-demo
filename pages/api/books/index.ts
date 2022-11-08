import { NextApiRequest, NextApiResponse } from 'next';

import { BookType } from '@prisma/client';
import prisma from '../../../lib/prisma'

const DEFAULT_PAGE_NUM = 1;
const DEFAULT_PAGE_SIZE = 8;

enum SortType {
  PRICE = 'price',
  PUBLISHED_AT = 'publishedAt'
};
enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
};
const sortTypes = Object.values(SortType);
const sortOrders = Object.values(SortOrder);
const bookTypes = Object.keys(BookType);

const bookListHandler =  async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method === 'GET') {
    try {
      res.status(200).json(await getBookList(req));
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

async function getBookList(req: NextApiRequest) {
  // Querying with joins (Many to many relation).
  const query = parseBookListQuery(req.query, true, true);
  const books: any[] = await prisma.book.findMany({
    ...query,
    include: {
      authors: {
        select: {
          author: {
            select: {
              id: true,
              name: true
            }
          }
        }
      },
    },
  });
  const bookIds = books.map((b) => b.id);

  // Grouping.
  //
  // Calculate the average rating score for the books in the result.
  //
  // Notice: It is more suitable to add column named `average_rating` in books table to store 
  // the average rating score, which can avoid the need to query every time you use it, and 
  // it is easier to implement the sorting feature.
  const bookAverageRatings = await prisma.rating.groupBy({
    by: ['bookId'],
    _avg: {
      score: true
    },
    where: {
      bookId: {
        in: bookIds
      }
    },
    // Why must set orderBy?
    orderBy: {
      _avg: {
        score: 'asc'
      }
    }
  });
  for (const rating of bookAverageRatings) {
    const index = books.findIndex((b) => b.id === rating.bookId);
    books[index].averageRating = rating._avg.score;
  }

  const bookCountRatings = await prisma.rating.groupBy({
    by: ['bookId'],
    _count: {
      bookId: true
    },
    where: {
      bookId: {
        in: bookIds
      }
    },
    orderBy: {
      _count: {
        bookId: 'asc'
      },
    }
  });
  for (const rating of bookCountRatings) {
    const index = books.findIndex((b) => b.id === rating.bookId);
    books[index].ratings = rating._count.bookId;
  }

  // Counting.
  const total = await prisma.book.count(parseBookListQuery(req.query));

  return {
    content: books,
    total: total
  }
}

function parseBookListQuery(query: any, sorting: boolean = false, paging: boolean = false) {
  const q:any = {}

  // Filtering.
  // Reference: https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting
  q.where = {};
  if (typeof query.type === 'string') {
    if (!bookTypes.includes(query.type)) {
      throw new Error(`Parameter \`type\` must be one of [${bookTypes.join(', ')}].`);
    }
    q.where.type = query.type;
  }

  // Sorting.
  if (sorting) {
    if (sortTypes.includes(query.sort)) {
      let order = SortOrder.ASC;
      if (sortOrders.includes(query.order)) {
        order = query.order 
      }

      if (query.sort === SortType.PRICE) {
        q.orderBy = {
          price: order
        };
      } else if (query.sort === SortType.PUBLISHED_AT) {
        q.orderBy = {
          publishedAt: order
        };
      }
    }
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

export default bookListHandler;
