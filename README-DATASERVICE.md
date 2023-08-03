# TiDB Cloud Data Service

[About TiDB Cloud Data Service (Beta)](https://docs.pingcap.com/tidbcloud/data-service-overview)

> TiDB Cloud provides a Data Service (beta) feature that enables you to access TiDB Cloud data via an HTTPS request using a custom API endpoint. This feature uses a serverless architecture to handle computing resources and elastic scaling, so you can focus on the query logic in endpoints without worrying about infrastructure or maintenance costs.

We will introduce how to add some Data Service API examples to the existing Bookshop demo.

## Prerequisites

- Create a [TiDB Cloud](https://tidbcloud.com/) account and get your free trial cluster.

- Deploy a Bookshop demo on Vercel. You can follow the [README](./README.md) to deploy the demo.

- All the Data Service configurations are under the `data-service` folder. You can follow the official [documentation](https://docs.pingcap.com/tidbcloud/data-service-manage-github-connection#import-configurations-of-an-existing-data-app) to set up the environment.

## Data Service Examples

### Before you start

Setup the environment variables:

```bash
TIDB_CLOUD_DS_PUB_KEY=  # The public key of the Data Service
TIDB_CLOUD_DS_PRI_KEY= # The private key of the Data Service
TIDB_CLOUD_DS_ENDPOINT= # The endpoint of the Data Service
```

### Example 1: Query the data of a table

SQL is defined in [`data-service/http_endpoints/sql/GET-v1-book.sql`](data-service/http_endpoints/sql/GET-v1-book.sql):

```sql
USE bookshop;

SELECT
  b.id,
  b.title,
  b.type,
  b.published_at,
  b.stock,
  b.price,
  r.score,
  a.name
FROM
  `books` AS b
  JOIN `ratings` AS r ON b.id = r.book_id
  JOIN `book_authors` AS ba ON b.id = ba.book_id
  JOIN `authors` AS a ON ba.author_id = a.id
WHERE b.id = ${book_id}
LIMIT 1
```

The `book_id` is a parameter in the URL. The Data Service will replace `${book_id}` with the value in the URL.

API is defined in [`pages/api/data-service/book/[id].ts`](pages/api/data-service/book/[id].ts):

```typescript
// handle GET request
if (req.method === 'GET') {
  const url = process.env?.TIDB_CLOUD_DS_ENDPOINT + `/v1/book?book_id=${id}`;
  const data = await client.fetch(url).then((res) => res.json());
  res.status(200).json(data);
  return;
}
```
