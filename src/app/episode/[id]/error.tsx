// src/app/episode/[id]/error.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Episode Page Error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error Loading Episode
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error.message}</p>
                <p className="mt-1 text-xs text-red-600">
                  Jika masalah berlanjut, silakan coba beberapa saat lagi
                </p>
              </div>
              <div className="mt-4 space-x-4">
                <button
                  onClick={() => {
                    console.log('Attempting reset...');
                    reset();
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Coba Lagi
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4">
            <details className="bg-gray-100 p-4 rounded">
              <summary className="text-sm font-medium cursor-pointer">
                Debug Information
              </summary>
              <pre className="mt-2 text-xs overflow-x-auto">
                {JSON.stringify({
                  error: error.message,
                  stack: error.stack,
                  env: process.env.NEXT_PUBLIC_API_URL,
                }, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}