// create mongodb connection
import { MongoClient } from "mongodb";
const DATABASE_NAME = process.env.DATABASE_NAME as string;
const connectionString = process.env.MONGO_DB

if (!connectionString) {
    throw new Error('connection string not found, CONFIG')
}

let client: MongoClient

export const getMongoClientInstance = async () => {
    if(!client) {
        client = new MongoClient(connectionString)
        await client.connect()
    }

    return client
}

export const getDb = async () => {
    const client = await getMongoClientInstance();
    const db = client.db(DATABASE_NAME);
  
    return db;
};