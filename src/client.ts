import type {
  Document,
  Filter
} from "../deps.ts";
import {
  Collection
} from "./collection.ts";

export interface ClientOptions {
  apiKey: string;
  baseUrl: URL | string;
  cluster: string;
  defaultDatabase?: string;
}

export class Client {
  #baseHeaders: Headers;
  readonly apiKey: string;
  readonly baseUrl: string;
  readonly cluster: string;
  readonly defaultDb?: string;
  
  constructor(options: ClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl instanceof URL ? options.baseUrl.toString() : options.baseUrl;
    this.#baseHeaders = new Headers({
      "access-control-request-headers": "*",
      "apiKey": this.apiKey,
      "content-type": "application/json"
    });
    this.cluster = options.cluster;

    if ("defaultDatabase" in options) this.defaultDb = options.defaultDatabase;
  }

  createCollection<T extends Document>(database: string, name: string): Collection<T> {
    return new Collection<T>(this, {
      dbName: database,
      name
    });
  }
}
