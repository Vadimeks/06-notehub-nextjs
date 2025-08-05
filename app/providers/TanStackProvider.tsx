"use client";

import {
  QueryClient,
  QueryClientProvider,
  DehydratedState,
  HydrationBoundary,
} from "@tanstack/react-query";
import React, { useState } from "react";

interface ReactQueryProviderProps {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}

export default function TanStackProvider({
  children,
  dehydratedState,
}: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* Замест Hydrate выкарыстоўваем HydrationBoundary */}
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
