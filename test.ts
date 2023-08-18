import {
  Client
} from "./mod.ts";

const client = new Client({
  cluster: "Cluster0",
  baseUrl: Deno.env.get("MONGO_API_URL")!,
  apiKey: Deno.env.get("MONGO_API_KEY")!
});

const collection = client.createCollection("test", "coll");
const modified = await collection.updateOne(
  { _id: 1 },
  { $set: { date: Date.now() } },
  { upsert: true }
);
console.log(modified);
