import type {
  Client
} from "./client.ts";

export interface CreateCollectionOptions {
  dbName: string;
  name: string;
}

export class Collection {
  #client: Client;
  #dbName: string;
  #name: string;

  constructor(client: Client, options: CreateCollectionOptions) {
    this.#client = client;
    this.#dbName = options.dbName ?? client.defaultDB;
    this.#name = options.name;
  }
}
