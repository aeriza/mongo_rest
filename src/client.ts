import type {
  Document,
  Filter
} from "../deps.ts";

export interface ClientOptions {
  apiKey: string;
  baseUrl: URL | string;
  cluster: string;
  defaultDatabase?: string;
}

export class Client {
  #apiKey: string;
  #baseHeaders: Headers;
  #baseUrl: string;
  #cluster: string;
  
  constructor(options: ClientOptions) {
    this.#apiKey = options.apiKey;
    this.#baseUrl = options.baseUrl instanceof URL ? options.baseUrl.toString() : options.baseUrl;
    this.#baseHeaders = new Headers({
      "access-control-request-headers": "*",
      "content-type": "application/json"
    });
    this.#cluster = options.cluster;
  }

  async function findOne<T extends Document>(options: <{ db: string; collection: string; filter: Filter<T>; projection: Document }>): Promise<T | undefined> {
    
  }
}
