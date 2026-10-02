'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian px-6">
      <div className="max-w-md w-full text-center space-y-8 p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
        <div className="w-20 h-20 bg-power-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-power-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tighter">
          Something went wrong
        </h1>
        <p className="text-white/60">
          An unexpected error occurred in the culinary engine. Our team has been notified.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => reset()}
            className="w-full bg-power-red hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-power-red/20"
          >
            Try again
          </button>
          <Link
            href="/"
            className="w-full border border-white/10 hover:bg-white/5 text-white font-bold py-4 rounded-xl transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
