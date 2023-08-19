import dotenv from 'dotenv';
import { connect } from "mongoose";
dotenv.config();

export async function connectMongo() {
  try {
    await connect(
      process.env.MONGO_URL
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
