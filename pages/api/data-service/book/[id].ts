import { NextApiRequest, NextApiResponse } from 'next';
import DigestClient from 'digest-fetch';
import _ from 'lodash';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const client = new DigestClient(
    process.env?.TIDB_CLOUD_DS_PUB_KEY,
    process.env?.TIDB_CLOUD_DS_PRI_KEY,
    { basic: true }
  );

  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Missing book ID' });
    return;
  }

  // handle GET request
  if (req.method === 'GET') {
    const url = process.env?.TIDB_CLOUD_DS_ENDPOINT + `/v1/book?book_id=${id}`;
    const data = await client.fetch(url).then((res) => res.json());
    res.status(200).json(data);
    return;
  } else if (req.method === 'PUT') {
    // handle PUT request
    const url = process.env?.TIDB_CLOUD_DS_ENDPOINT + `/v1/book?book_id=${id}`;
    const { stock } = req.body;
    if (_.isNumber(stock)) {
      const data = await client
        .fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stock, book_id: id }),
        })
        .then((res) => res.json());
      res.status(200).json(data);
      return;
    }
    res.status(400).json({ error: 'Missing stock' });
    return;
  }

  res.status(400).json({ error: 'Invalid request method' });
};

export default handler;
