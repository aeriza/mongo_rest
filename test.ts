import {
  Client
} from "./mod.ts";

const client = new Client({
  cluster: "Cluster0",
  baseUrl: Deno.env.get("MONGO_API_URL")!,
  apiKey: Deno.env.get("MONGO_API_KEY")!
});

const documents = await client.find({
  db: "test",
  collection: "coll",
  filter: {
    _id: 1
  }
});

console.log(documents);
