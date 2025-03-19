'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchFormProps {
  initialQuery?: string;
}

export default function SearchForm({ initialQuery = '' }: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search anime..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}