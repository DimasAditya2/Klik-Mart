import { ObjectId } from "mongodb";
import { getDb } from "../config";
import { hasPass } from "../helpers/bcrypt";
import { UserModel } from "@/types/UserModelType";
const COLLECTION_USER = process.env.COLLECTION_USER as string;

export type UserModelInput = Omit<UserModel, "_id">;


// GET ALL USER FROM DB
export const getAllUsers = async () => {
  try {
    const db = await getDb();
    const users = (await db
      .collection(COLLECTION_USER)
      .find()
      .project({ password: 0 })
      .toArray()) as UserModel[];
        
    return users;
  } catch (error) {
    console.log(error, '<--- error di getalluser');
  }
};

// GET ALL USER FROM DB BY ID
export const getUserById = async (id: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    )) as UserModel;
      
  return user;
};

// REGISTER
export const createUser = async (user: UserModelInput) => {
    const db = await getDb();
    
    const modifiedUser: UserModelInput = {
        ...user,
        password: hasPass(user.password)
    }

    const newUser = await db.collection(COLLECTION_USER).insertOne(modifiedUser)

    return newUser;
}

// LOGIN FIND BY EMAIL
export const findByEmail = async(email: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({email})) as UserModel
      
  return user;
}