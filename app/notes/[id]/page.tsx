import { QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <TanStackProvider>
      <NoteDetailsClient />
    </TanStackProvider>
  );
}
