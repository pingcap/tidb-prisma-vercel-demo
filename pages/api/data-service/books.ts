import { NextApiRequest, NextApiResponse } from 'next';
import DigestClient from 'digest-fetch';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const client = new DigestClient(
    process.env?.TIDB_CLOUD_DS_PUB_KEY,
    process.env?.TIDB_CLOUD_DS_PRI_KEY,
    { basic: true }
  );

  const url = process.env?.TIDB_CLOUD_DS_ENDPOINT + `/v1/books`;

  const data = await client.fetch(url).then((res) => res.json());

  console.log(data);

  res.status(200).json(data);
};

export default handler;
