import { QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import type { FetchNotesResponse } from "@/types/api";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const initialNotesData = await queryClient.fetchQuery<FetchNotesResponse>({
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes(1, 12, ""),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <main>
        {}
        <NotesClient initialNotesData={initialNotesData} />
      </main>
    </TanStackProvider>
  );
}
