/** Options for find documents from collection */
export interface FindOptions {
  limit?: number;
  projection?: Document;
  skip?: number;
  sort?: Document;
}
