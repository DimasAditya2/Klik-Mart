require("dotenv").config();
const { MongoClient } = require("mongodb");

const URI = process.env.MONGO_DB;
const DATABASE_NAME = process.env.DATABASE_NAME;
const COLLECTION_NAME = "products";

async function seedProducts() {
  let client;
  try {
    console.log("mulai seed...");

    client = await MongoClient.connect(URI);

    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const productData = require("./data.json");

    await collection.insertMany(productData);
    console.log("succes seed!");
  } catch (error) {
    console.error("gagal seed products:", error);
  } finally {
    await client.close();
    process.exit();
  }
}

seedProducts();
