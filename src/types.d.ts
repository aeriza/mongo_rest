import type {
  Document
} from "../deps.ts";

/** Preset data for API requests to mongo servers */
export interface RequestBody {
  /** Your mongo atlas cluster name */
  dataSource: string;
  /** Your database name */
  database: string;
  /** Your collection name */
  collection: string;
}

/**
 * Options for collection creation
 */
export interface CollectionOptions {
  /** Database name you want to manage */
  dbName: string;
  /** The name of the collection in the database that you want to manage */
  name: string;
}

/** Options for find documents from collection */
export interface FindOptions {
  limit?: number;
  projection?: Document;
  skip?: number;
  sort?: Document;
}

export interface UpdateOptions {
  /**
   * When true, creates a new document if no document matches the query.
   * @default {false}
   */
  upsert?: boolean;
}
