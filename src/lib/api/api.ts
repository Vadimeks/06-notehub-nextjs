// src/lib/api/noteService.ts
import axios from "axios";
import type { Note, FetchNotesResponse } from "@/types/notes";

// Устанавіце базавы URL правільна. Ён павінен быць коранем, без шляху /api
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
    // Вось тут галоўнае выпраўленне: шлях да API
    const response = await axios.get<FetchNotesResponse>(
      `${API_BASE_URL}/api/notes`,
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

// Аналагічна, трэба змяніць шляхі ў іншых функцыях
export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  try {
    const response = await axios.post<Note>(
      `${API_BASE_URL}/api/notes`, // Шлях з /api/notes
      note,
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

export const deleteNote = async (id: number): Promise<Note> => {
  try {
    const response = await axios.delete<Note>(
      `${API_BASE_URL}/api/notes/${id}`, // Шлях з /api/notes
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
