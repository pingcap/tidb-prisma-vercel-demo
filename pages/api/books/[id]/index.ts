import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../lib/prisma'

const ALLOW_UPDATE_FIELDS = ['type', 'price', 'stock', 'publishedAt']

const bookDetailHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    switch(req.method) {
        case 'GET':
            try {
                res.status(200).json(await getBookDetail(req));
            } catch (err:any) {
                console.error(err)
                    res.status(500).json({
                    message: err.message
                });
            }
            break;
        case 'PUT':
            try {
                await updateBookDetail(req, res);
            } catch (err:any) {
                console.error(err)
                    res.status(500).json({
                    message: err.message
                });
            }
            break;
        default:
            res.status(401).json({
                message: `HTTP method ${req.method} is not supported.`
            });
    }
}

async function getBookDetail(req: NextApiRequest) {
    // Get bookID;
    if (typeof req.query.id !== 'string' && typeof req.query.id !== 'number') {
        throw new Error('Invalid parameter `id`.');
    }
    const bookId = BigInt(req.query.id);

    // Get record by unique identifier.
    // Reference: https://www.prisma.io/docs/concepts/components/prisma-client/crud#get-record-by-compound-id-or-compound-unique-identifier
    const book: any = await prisma.book.findUnique({
        where: {
            id: bookId
        }
    });

    // Aggregation.
    // Reference: https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing
    const averageRating = await prisma.rating.aggregate({
        _avg: {
            score: true
        },
        where: {
            bookId: {
                equals: bookId
            }
        },
    });
    book.averageRating = averageRating._avg.score;

    return book;
}

async function updateBookDetail(req: NextApiRequest, res: NextApiResponse<any>) {
    // Get bookID;
    if (typeof req.query.id !== 'string' && typeof req.query.id !== 'number') {
        throw new Error('Invalid parameter `id`.');
    }
    const bookId = BigInt(req.query.id);

    if (req.body == null || typeof req.body !== 'object') {
        throw new Error('Invalid parameters.');
    }

    const updateData:any = {};
    for (const [key, value] of Object.entries(req.body)) {
        if (ALLOW_UPDATE_FIELDS.includes(key)) {
            updateData[key] = value;
        }
    }

    const result = await prisma.book.update({
        data: updateData,
        where: {
            id: bookId
        }
    });

    res.status(200).json({
        message: 'success',
        data: result
    });
}

export default bookDetailHandler;
