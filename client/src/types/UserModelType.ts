import { ObjectId } from "mongodb";
export interface UserModel {
    _id: ObjectId;
    name: string;
    username: string;
    email: string;
    password: string;
  }