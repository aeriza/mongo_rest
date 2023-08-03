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
  #baseUrl: string;
  #cluster: string;
  defaultDatabase?: string;
  
  constructor(options: ClientOptions) {
    this.#apiKey = options.apiKey;
    this.#baseUrl = options.baseUrl instanceof URL ? options.baseUrl.toString() : options.baseUrl;
    this.#cluster = options.cluster;

    if ("defaultDatabase" in options) this.defaultDatabase = options.defaultDatabase;
  }
}
