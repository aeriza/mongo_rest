import type {
  Client
} from "./client.ts";
import type {
  Document
} from "../deps.ts";

export interface CreateCollectionOptions {
  dbName: string;
  name: string;
}

export class Collection<T extends Document> {
  #client: Client;
  #dbName: string;
  #name: string;

  constructor(client: Client, options: CreateCollectionOptions) {
    this.#client = client;
    this.#dbName = options.dbName ?? client.defaultDB;
    this.#name = options.name;
  }

  async #request(
    path: string, 
    data: unknown
  ): Promise<any> {
    const request = await fetch(`${this.#client.baseUrl}/action/${path}`, {
      headers: new Headers({
        "access-control-request-headers": "*",
        "apiKey": this.#client.apiKey,
        "content-type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(data)
    });

    const response = await request.json();

    if ([400, 401].includes(request.status)) {
      return throw new Error(response.error)
    }

    return response;
  }
}
