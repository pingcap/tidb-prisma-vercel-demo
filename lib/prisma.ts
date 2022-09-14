import { PrismaClient } from "@prisma/client";
import { writeFileSync } from "fs";

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
    ? `mysql://${process.env.TIDB_USER}:${process.env.TIDB_PASSWORD}@${process.env.TIDB_HOST}:${process.env.TIDB_PORT}/bookshop`
    : process.env.DATABASE_URL;

const generateSSLCA = (content?: string) => {
  if (!content) {
    // console.log("No SSL CA provided");
    return "";
  }
  // console.log("SSL CA provided");
  writeFileSync("./ssl-ca.cert", content);
  return `?sslcert=../ssl-ca.cert`;
};

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL + generateSSLCA(process.env.TIDB_SSL_CA),
      },
    },
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasources: {
        db: {
          url: DATABASE_URL + generateSSLCA(process.env.TIDB_SSL_CA),
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