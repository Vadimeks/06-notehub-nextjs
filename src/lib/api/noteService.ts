import axios from "axios";
import type { Note, FetchNotesResponse } from "@/types/notes";

// Устанавіце базавы URL правільна. Эндпойнт API знаходзіцца ў корані.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://notehub-public.goit.study";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string = ""
): Promise<FetchNotesResponse> => {
  try {
    const params: { page: number; perPage: number; search?: string } = {
      page,
      perPage,
    };
    if (search) {
      params.search = search;
    }
    const response = await axios.get<FetchNotesResponse>(
      // Выпраўлены шлях: толькі '/notes'
      `${API_BASE_URL}/notes`,
      {
        params,
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );
    return response.data;
  } catch (error) {
    // ...
    throw error;
  }
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  try {
    const response = await axios.post<Note>(`${API_BASE_URL}/notes`, note, {
      // Выпраўлены шлях
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data;
  } catch (error) {
    // ...
    throw error;
  }
};

export const deleteNote = async (id: number): Promise<Note> => {
  try {
    const response = await axios.delete<Note>(
      `${API_BASE_URL}/notes/${id}`, // Выпраўлены шлях
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );
    return response.data;
  } catch (error) {
    // ...
    throw error;
  }
};
