import { QueryClient, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

interface NoteDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NoteDetailsClient />
    </TanStackProvider>
  );
}
