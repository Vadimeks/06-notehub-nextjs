"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/NoteModal/NoteModal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { fetchNotes } from "@/lib/api/api";
import type { FetchNotesResponse } from "@/types/notes";
import css from "./page.module.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, isLoading, isError, error } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ["notes", debouncedQuery, page],
    queryFn: () => fetchNotes(page, 12, debouncedQuery),
    enabled: true,
    placeholderData: keepPreviousData,
    retry: 1,
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing
          personal notes. It helps keep your thoughts organized and accessible
          in one place, whether you are at home or on the go.
        </p>
        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing
          notes. With support for keyword search and structured organization,
          NoteHub offers a streamlined experience for anyone who values clarity
          and productivity.
        </p>
      </div>
      <div>
        <div className={css.app}>
          <header className={css.toolbar}>
            <SearchBox onSearch={handleSearch} />
            {data && data.totalPages > 1 && (
              <Pagination
                pageCount={Math.min(data.totalPages, 4)}
                onPageChange={handlePageChange}
                currentPage={page}
              />
            )}
            <button className={css.button} onClick={handleOpenModal}>
              Create note +
            </button>
          </header>
          {isLoading && !data && <Loader />}
          {isError && (
            <div>
              Error fetching notes: {error.message}
              {error.message.includes("400") && (
                <p>
                  Check if the token is valid or try a different search query.
                </p>
              )}
            </div>
          )}
          {data && data.notes && data.notes.length > 0 && (
            <NoteList notes={data.notes} />
          )}
          {data && data.notes && data.notes.length === 0 && !isLoading && (
            <p>No notes found.</p>
          )}
          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <NoteForm onClose={handleCloseModal} />
            </Modal>
          )}
        </div>
      </div>
    </main>
  );
}
