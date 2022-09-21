import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
  interface BigInt {
    toJSON(): string;
  }
}

let prisma: PrismaClient

const DATABASE_URL =
  process.env.TIDB_USER &&
  process.env.TIDB_PASSWORD &&
  process.env.TIDB_HOST &&
  process.env.TIDB_PORT
    ? `mysql://${process.env.TIDB_USER}:${process.env.TIDB_PASSWORD}@${process.env.TIDB_HOST}:${process.env.TIDB_PORT}/bookshop?pool_timeout=60`
    : `${process.env.DATABASE_URL}?pool_timeout=60`;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasources: {
        db: {
          url: DATABASE_URL,
        },
      },
    });
  }
  prisma = global.prisma
}

BigInt.prototype.toJSON = function() {       
  return this.toString()
}

export default prisma