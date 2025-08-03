"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Выкарыстоўваем useState, каб кліент не ствараўся паўторна пры кожным рэндэрынгу.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Усталёўваем час жыцця дадзеных, каб пазбегнуць занадта частых запытаў
            staleTime: 60 * 1000, // 60 секунд
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
