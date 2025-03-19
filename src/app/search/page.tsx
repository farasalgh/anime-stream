import { searchAnime } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import SearchForm from '@/components/SearchForm';

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const page = Number(searchParams.page) || 1;
  
  // Pastikan results selalu memiliki nilai default
  const results = query ? await searchAnime(query, page) : { animeList: [] };

  return (
    <main className="container mx-auto px-4 py-8">

      {query && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Search Results for "{query}"
          </h2>
          
          {results?.animeList?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.animeList.map((anime) => (
                <AnimeCard
                  key={anime.animeId}
                  title={anime.title}
                  poster={anime.poster}
                  episodes={anime.episodes}
                  score={anime.score}
                  animeId={anime.animeId}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">Anime tidak tersedia.</p>
          )}
        </div>
      )}
    </main>
  );
}
