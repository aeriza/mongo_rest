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
      collection: name
    });
  }

  async findOne<T extends Document>(options: { db: string; collection: string; filter: Filter<T>; projection?: Document }): Promise<T | undefined> {
    const data = {
      dataSource: this.cluster,
      database: options.db,
      collection: options.collection,
      filter: options.filter,
      projection: options.projection
    };

    const request = await fetch(this.baseUrl + "/action/findOne", {
      headers: this.#baseHeaders,
      method: "POST",
      body: JSON.stringify(data)
    });
    const response = await request.json();

    return response.document;
  }

  async find<T extends Document>(options: { db: string; collection: string; filter: Filter<T>; projection?: Document; sort?: Document; limit?: number; skip?: number }): Promise<T[]> {
    const data = {
      dataSource: this.cluster,
      database: options.db,
      collection: options.collection,
      filter: options.filter,
      projection: options.projection,
      sort: options.sort,
      limit: options.limit,
      skip: options.skip
    };

    const request = await fetch(this.baseUrl + "/action/find", {
      headers: this.#baseHeaders,
      method: "POST",
      body: JSON.stringify(data)
    });
    const response = await request.json();

    return response.documents;
  }
}
