import { getAnimeList, getTopRatedAnime } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';


export default async function Home() {
  const [ongoingAnime, completedAnime, topRatedAnime] = await Promise.all([
    getAnimeList('ongoing'),
    getAnimeList('completed'),
    getTopRatedAnime(),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Anime Top Rated */}
      <section>
        <h1 className="text-3xl font-extrabold mb-4">🏆 Top Rated Anime</h1>
        {topRatedAnime.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {topRatedAnime.map((anime) => (
              <AnimeCard
                key={anime.animeId}
                title={anime.title}
                poster={anime.poster}
                episodes={anime.episodes}
                score={anime.score}
                animeId={anime.animeId}
                className="transform hover:scale-105 transition duration-300 shadow-lg border-2 border-red-500"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No top-rated anime found.</p>
        )}
      </section>

      {/* Ongoing Anime */}
      <section className="mt-10">
        <h1 className="text-2xl font-bold mb-4">Ongoing Anime</h1>
        {ongoingAnime.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ongoingAnime.map((anime) => (
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
          <p className="text-gray-600">No ongoing anime found.</p>
        )}
      </section>

      {/* Completed Anime */}
      <section className="mt-10">
        <h1 className="text-2xl font-bold mb-4">Completed Anime</h1>
        {completedAnime.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {completedAnime.map((anime) => (
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
          <p className="text-gray-600">No completed anime found.</p>
        )}
      </section>
    </main>
  );
}
