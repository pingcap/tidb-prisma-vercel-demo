import { NextApiRequest, NextApiResponse } from 'next';
import DigestClient from 'digest-fetch';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const client = new DigestClient(
    process.env?.TIDB_CLOUD_DS_PUB_KEY,
    process.env?.TIDB_CLOUD_DS_PRI_KEY,
    { basic: true }
  );

  const url = process.env?.TIDB_CLOUD_DS_ENDPOINT + `/v1/book/rating`;

  if (req.method === 'GET') {
    const { book_id } = req.query;
    if (!book_id) {
      res.status(400).json({ error: 'Missing book ID' });
      return;
    }
    const data = await client
      .fetch(url + `?book_id=${book_id}`)
      .then((res) => res.json());
    res.status(200).json(data);
    return;
  } else if (req.method === 'POST') {
    const { book_id, score, user_id } = req.body;
    if (!book_id || !score || !user_id) {
      res.status(400).json({ error: 'Missing book ID or score or user ID' });
      return;
    }
    const data = await client
      .fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book_id, score, user_id }),
      })
      .then((res) => res.json());
    res.status(200).json(data);
    return;
  // } else if (req.method === 'DELETE') {
  //   const { book_id, user_id } = req.body;
  //   if (!book_id || !user_id) {
  //     res.status(400).json({ error: 'Missing book ID or user ID' });
  //     return;
  //   }
  //   const data = await client
  //     .fetch(url, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ user_id, book_id }),
  //     })
  //     .then((res) => res.json());
  //   res.status(200).json(data);
  //   return;
  }

  res.status(400).json({ error: 'Invalid request method' });
};

export default handler;
