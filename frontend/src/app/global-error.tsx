'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-obsidian text-white flex items-center justify-center min-h-screen">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold">A critical engine failure occurred.</h2>
          <button 
            onClick={() => reset()}
            className="px-6 py-3 bg-power-red rounded-full font-bold"
          >
            Reboot System
          </button>
        </div>
      </body>
    </html>
  );
}
