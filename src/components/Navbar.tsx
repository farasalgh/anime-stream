// src/components/Navbar.tsx
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Anime Streaming
          </Link>

          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/search"
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}