import type {
  Client
} from "./client.ts";
import type {
  Document,
  Filter
} from "../deps.ts";

export interface BaseRequestBody {
  dataSource: string;
  database: string;
  collection: string;
}

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
    this.#dbName = options.dbName
    this.#name = options.name;
  }

  async #request(
    path: string, 
    data: unknown
  ): Promise<any> {
    const rawData: BaseRequestBody = {
      dataSource: this.#client.cluster,
      database: this.#dbName,
      collection: this.#name
    }
    
    const request = await fetch(`${this.#client.baseUrl}/action/${path}`, {
      headers: new Headers({
        "access-control-request-headers": "*",
        "apiKey": this.#client.apiKey,
        "content-type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(Object.assign(rawData, data))
    });

    const response = await request.json();
    console.log(response);
    
    if ([400, 401].includes(request.status)) {
      throw new Error(response.error)
    }

    return response;
  }

  async findOne(filter: Filter<T>, projection?: Document): Promise<T | null> {
    const data = await this.#request("/findOne", {
      filter, projection
    });

    return data.document ?? null;
  }
}
