import { BookType, PrismaClient } from '@prisma/client';

import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

const { TIDB_USER, TIDB_PASSWORD, TIDB_HOST, TIDB_PORT, TIDB_DB_NAME = 'bookshop', DATABASE_URL } = process.env;
// Notice: When using TiDb Cloud Serverless Tier, you **MUST** set the following flags to enable tls connection.
const SSL_FLAGS = 'pool_timeout=60&sslaccept=accept_invalid_certs';
// TODO: When TiDB Cloud support return DATABASE_URL, we can remove it.
const databaseURL = DATABASE_URL
    ? `${DATABASE_URL}?${SSL_FLAGS}`
    : `mysql://${TIDB_USER}:${TIDB_PASSWORD}@${TIDB_HOST}:${TIDB_PORT}/${TIDB_DB_NAME}?${SSL_FLAGS}`;

const setup = async () => {
  let client;

  try {
    client = new PrismaClient({
      datasources: {
        db: {
          url: databaseURL
        }
      }
    });
    await client.$connect();

    const hasData = await client.user.count() > 0;

    if (hasData) {
      console.log('Database already exists with data');
      client.$disconnect();
      return;
    }

    // Seed data.
    const users = await seedUsers(client, 20);
    const authors = await seedAuthors(client, 20);
    const books = await seedBooks(client, 100);
    await seedBooksAndAuthors(client, books, authors);
    await seedRatings(client, books, users);
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      await client.$disconnect();
    }
  }
};

// Seed users data.
async function seedUsers(client, num) {
  const records = [...Array(num)].map((value, index) => {
    const id = index + 1;
    const nickname = faker.internet.userName();
    const balance = faker.random.numeric(6);

    return {
      id,
      nickname,
      balance
    };
  });

  const added = await client.user.createMany({
      data: records,
      skipDuplicates: true
  });

  if (added.count > 0) {
    console.log(`Successfully inserted ${added.count} user records.`);
  }

  return records;
}

// Seed authors data.
async function seedAuthors(client, num) {
  const records = [...Array(num)].map((value, index) => {
    const id = index + 1;
    const name = faker.name.fullName();
    const gender = faker.datatype.boolean();
    const birthYear = faker.datatype.number({ min: 1900, max: 2000 });
    let deathYear = birthYear + faker.datatype.number({ min: 20, max: 100 });
    if (deathYear > 100) {
      deathYear = undefined;
    }
    return {
      id,
      name,
      gender,
      birthYear,
      deathYear
    };
  });

  const added = await client.author.createMany({
      data: records,
      skipDuplicates: true
  });

  if (added.count > 0) {
    console.log(`Successfully inserted ${added.count} author records.`);
  }

  return records;
}

// Seed books data.
const bookTypes = Object.keys(BookType);
async function seedBooks(client, num) {
  const records = [...Array(num)].map((value, index) => {
    const id = index + 1;
    const title = faker.music.songName();
    const bookTypeIndex = faker.datatype.number({ min: 0, max: bookTypes.length - 1 });
    const type = bookTypes[bookTypeIndex];
    const publishedAt = faker.date.between('2000-01-01T00:00:00.000Z', Date.now().toString());
    const stock = faker.datatype.number({ min: 0, max: 200 });
    const price = faker.datatype.number({ min: 0, max: 200, precision: 0.01 });

    return {
      id,
      title,
      type,
      publishedAt,
      stock,
      price
    };
  });

  const added = await client.book.createMany({
      data: records,
      skipDuplicates: true
  });

  if (added.count > 0) {
    console.log(`Successfully inserted ${added.count} book records.`);
  }

  return records;
}

// Seed books and authors data.
async function seedBooksAndAuthors(client, books, authors) {
  const records = books.map((book) => {
    const authorIndex = faker.datatype.number({ min: 0, max: authors.length - 1 });
    const author = authors[authorIndex];

    return {
      bookId: book.id,
      authorId: author.id
    }
  });

  const added = await client.bookAuthor.createMany({
    data: records,
    skipDuplicates: true
  });

  if (added.count > 0) {
    console.log(`Successfully inserted ${added.count} book and author relation records.`);
  }

  return records;
}

// Seed ratings data.
async function seedRatings(client, books, users) {
  let total = 0;
  for (const book of books) {
    const ratingNum = faker.datatype.number({ min: 10, max: 30});
    const bookId = book.id;
    const records = [...Array(ratingNum)].map(() => {
      const score = faker.datatype.number({ min: 1, max: 5 });
      const userIndex = faker.datatype.number({ min: 1, max: users.length - 1 });
      const userId = users[userIndex].id;
      const ratedAt = faker.date.between(book.publishedAt.toString(), Date.now().toString());

      return {
        userId,
        bookId,
        score,
        ratedAt
      }
    });

    const added = await client.rating.createMany({
      data: records,
      skipDuplicates: true
    });

    total += added.count;
  }

  if (total > 0) {
    console.log(`Successfully inserted ${total} rating records.`);
  }
}

try {
  await setup();
  console.log('Setup completed.');
} catch(error) {
  console.warn('Database is not ready yet. Skipping seeding...\n', error);
}

export { setup };