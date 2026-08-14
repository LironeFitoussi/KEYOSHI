import "server-only";

import { MongoClient, type Db } from "mongodb";
import { configureMongoDns } from "@/lib/dns";

const databaseName = process.env.MONGODB_DB ?? "keyoshi";

declare global {
  var keyoshiMongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not configured. Add it to web/.env.local locally and to the Vercel project environment."
    );
  }

  configureMongoDns();

  return new MongoClient(uri, {
    appName: "keyoshi-reader",
    maxPoolSize: 10,
  }).connect();
}

export function getMongoClient(): Promise<MongoClient> {
  if (!globalThis.keyoshiMongoClientPromise) {
    globalThis.keyoshiMongoClientPromise = createClientPromise().catch((error) => {
      globalThis.keyoshiMongoClientPromise = undefined;
      throw error;
    });
  }

  return globalThis.keyoshiMongoClientPromise;
}

export async function getDatabase(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(databaseName);
}
