require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const data = [
    {
      "userId": "60f7e9b3b6e8a5e2a8f9b6d1",
      "productId": "60f7e9b3b6e8a5e2a8f9b6d2",
      "createdAt": "2023-07-01T00:00:00Z",
      "updatedAt": "2023-07-01T00:00:00Z"
    },
    {
      "userId": "60f7e9b3b6e8a5e2a8f9b6d3",
      "productId": "60f7e9b3b6e8a5e2a8f9b6d4",
      "createdAt": "2023-07-02T00:00:00Z",
      "updatedAt": "2023-07-02T00:00:00Z"
    }
]
  

const URI = process.env.MONGO_DB;
const DATABASE_NAME = process.env.DATABASE_NAME;
const COLLECTION_NAME = "wishlist";

async function seedWishlist() {
  let client;
  try {
    console.log("Mulai seed...");

    client = await MongoClient.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const wishlistData = data

    // Convert string IDs to ObjectId
    const formattedWishlistData = wishlistData.map(item => ({
      ...item,
      userId:new ObjectId(item.userId),
      productId: new ObjectId(item.productId),
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));

    await collection.insertMany(formattedWishlistData);
    console.log("Sukses seed wishlist!");
  } catch (error) {
    console.error("Gagal seed wishlist:", error);
  } finally {
    if (client) {
      await client.close();
    }
    process.exit();
  }
}

seedWishlist();


