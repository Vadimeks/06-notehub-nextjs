import axios from "axios";
import type { Note, FetchNotesResponse } from "@/types/notes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://notehub-public.goit.study/api";
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
      `${API_BASE_URL}/notes`,
      {
        params,
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );
    return response.data;
  } catch (error) {
    // Кідаем памылку, каб яна дайшла да кампанента error.tsx
    throw error;
  }
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  try {
    const response = await axios.post<Note>(`${API_BASE_URL}/notes`, note, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data;
  } catch (error) {
    // Кідаем памылку, каб яна дайшла да кампанента error.tsx
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await axios.delete<Note>(`${API_BASE_URL}/notes/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data;
  } catch (error) {
    // Кідаем памылку, каб яна дайшла да кампанента error.tsx
    throw error;
  }
};
