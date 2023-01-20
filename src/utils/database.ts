import type Discord from "discord.js";
import { Collection, MongoClient } from "mongodb";
import config from "../config/main.json" assert { type: "json" };

const mongoClient = new MongoClient(config.mongoUrl);
await mongoClient.connect();
const database = mongoClient.db("Nucleus");
