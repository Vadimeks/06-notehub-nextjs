"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/api";
import type { Note } from "@/types/notes";
import styles from "@/components/NoteList/NoteList.module.css";
import toast from "react-hot-toast";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Error deleting note: ${error.message}`);
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div className={styles.noteList}>
      {notes.map((note) => (
        <div key={note.id} className={styles.noteCard}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p className={styles.tag}>{note.tag}</p>
          <p className={styles.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </p>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(note.id)}
            disabled={mutation.isPending}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
