import type {
  Client
} from "./client.ts";
import type {
  Document,
  Filter,
  InsertDocument,
  ObjectId
} from "../deps.ts";

import type {
  CollectionOptions,
  FindOptions,
  RequestBody
} from "./types.d.ts";

/**
 * Collection class to easily manage database contents
 */
export class Collection<T extends Document> {
  #client: Client;
  #dbName: string;
  #name: string;

  constructor(
    client: Client,
    options: CollectionOptions = {}
  ) {
    this.#client = client;
    this.#dbName = options.dbName
    this.#name = options.name;
  }

  async #request(
    path: string, 
    data: unknown
  ): Promise<any> {
    const rawData: RequestBody = {
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
    
    if ([400, 401].includes(request.status)) {
      throw new Error(response.error)
    }

    return response;
  }

  /** 
   * Search multiple documents with appropriate filters
   * @param filter Filter to find documents
   * @param options Additional options for pagination of search results
   */
  async findMany(
    filter: Filter<T>,
    options?: Omit<FindOptions, "updateOne" | "noCursorTimeout" | "maxTimeMS">
  ): Promise<T[]> {
    const { documents = [] } = await this.#request("find", Object.assign({ filter }, options));
    return documents;
  }

  /**
   * Search for document with the appropriate filter
   * @param filter Filter to find documents
   */
  async findOne(
    filter: Filter<T>,
    projection?: Document
  ): Promise<T | null> {
    const { document = null } = await this.#request("findOne", { filter, projection });
    return document;
  }

  /**
   * Insert many new documents in the database
   */
  async insertMany(documents: InsertDocument<T>[]): Promise<(Required<InsertDocument<T>>["_id"] | ObjectId)[]> {
    const { insertedIds = [] } = await this.#request("insertMany", { documents });
    return insertedIds;
  }

  /**
   * Insert new document in the database
   */
  async insertOne(document: InsertDocument<T>): Promise<Required<InsertDocument<T>>["_id"] | ObjectId> {
    const { insertedId = null } = await this.#request("insertOne", { document });
    return insertedId;
  }
}
