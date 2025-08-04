"use client";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md mt-10 mx-auto max-w-lg">
      <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-lg">
        Could not fetch the list of notes.{" "}
        <span className="font-mono text-sm">{error.message}</span>
      </p>
      <button
        className="mt-6 px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
