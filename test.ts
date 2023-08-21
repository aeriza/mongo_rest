import {
  Client
} from "./mod.ts";

const client = new Client({
  cluster: "Cluster0",
  baseUrl: "https://data.mongodb-api.com/app/data-qjmlk/endpoint/data/v1",
  apiKey: Deno.env.get("MONGO_API_KEY")!
});

const collection = client.createCollection("test", "coll");
const inserted = await collection.insertOne(
  { _id: 2, date: Date.now() }
);
console.log(inserted);
