import type {
  Document
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
  defaultDatabase?: string;
  
  constructor(options: ClientOptions) {
    this.#apiKey = options.apiKey;
    this.#baseUrl = options.baseUrl instanceof URL ? options.baseUrl.toString() : options.baseUrl;
    this.#baseHeaders = new Headers({
      "access-control-request-headers": "*",
      "content-type": "application/json"
    });
    this.#cluster = options.cluster;

    if ("defaultDatabase" in options) this.defaultDatabase = options.defaultDatabase;
  }
}
