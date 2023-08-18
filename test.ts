import {
  Client
} from "./mod.ts";

const client = new Client({
  cluster: "Cluster0",
  baseUrl: Deno.env.get("MONGO_API_URL")!,
  apiKey: Deno.env.get("MONGO_API_KEY")!
});

const collection = client.createCollection("test", "coll");
const inserted = await collection.insertOne(
  { _id: 2, date: Date.now() }
);
console.log(inserted);
