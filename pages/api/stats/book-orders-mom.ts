import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma'

const bookOrderMoMHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method === 'GET') {
	res.status(200).json(await getBookOrdersMonthOverMonth(req));
  } else {
    res.status(401).json({
      message: `HTTP method ${req.method} is not supported.`
    });
  }
}

async function getBookOrdersMonthOverMonth(req: NextApiRequest) {
	const result = await prisma.$queryRaw`
		WITH orders_group_by_month AS (
			SELECT
				b.type AS book_type,
				DATE_FORMAT(ordered_at, '%Y-%c') AS month,
				COUNT(*) AS orders
			FROM orders o
			LEFT JOIN books b ON o.book_id = b.id
			WHERE b.type IS NOT NULL
			GROUP BY book_type, month
		), acc AS (
			SELECT
				book_type,
				month,
				SUM(orders) OVER(PARTITION BY book_type ORDER BY book_type, month ASC) as acc
			FROM orders_group_by_month
			ORDER BY book_type, month ASC
		)
		SELECT * FROM acc;
	`;

	return {
		result: result
	}
}

export default bookOrderMoMHandler;
