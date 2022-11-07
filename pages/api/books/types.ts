import { NextApiRequest, NextApiResponse } from 'next';

import { BookType } from '@prisma/client';

const bookTypes = Object.values(BookType);

const bookTypeListHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    if (req.method === 'GET') {
        res.status(200).json(bookTypes);
    } else {
        res.status(401).json({
            message: `HTTP method ${req.method} is not supported.`
        });
    }
}

export default bookTypeListHandler;
