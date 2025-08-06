import type { Note } from "./note";

export interface FetchNotesResponse {
  items: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
