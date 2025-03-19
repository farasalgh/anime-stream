import Image from "next/image";
import Link from "next/link";
import { getAnimeDetail } from "@/lib/api";
import type { AnimeDetail } from "@/types";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function AnimePage({ params }: PageProps) {
  const { id } = params;
  const anime: AnimeDetail = await getAnimeDetail(id);
  console.log("Episode List:", anime.episodeList);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 shadow-md rounded-lg">
        {/* Poster Anime */}
        <div className="relative w-full md:w-[300px] h-[400px] border border-gray-200 rounded-lg overflow-hidden">
          <Image
            src={anime.poster}
            alt={anime.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>

        {/* Detail Anime */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            {anime.title}
          </h1>
          <p className="text-gray-700 italic">
            {anime.synonyms?.join(", ") || "-"}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>
              <strong>Score:</strong> {anime.score || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {anime.status}
            </p>
            <p>
              <strong>Episodes:</strong> {anime.episodes ?? "Unknown"}
            </p>
            <p>
              <strong>Type:</strong> {anime.type || "N/A"}
            </p>
            <p>
              <strong>Studio:</strong> {anime.studio || "Unknown"}
            </p>
            <p>
              <strong>Duration:</strong> {anime.duration || "Unknown"}
            </p>
            <p>
              <strong>Year:</strong> {anime.year || "N/A"}
            </p>
          </div>

          {/* Genre List */}
          {anime.genreList && anime.genreList.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {anime.genreList.map((genre, index) => (
                  <a
                    key={index}
                    href={genre.href} // Sesuaikan dengan `href`
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {genre.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Sinopsis */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
            <p className="text-gray-700">
              {anime.synopsis?.paragraphs?.join(" ") ||
                "No synopsis available."}
            </p>
          </div>


          {/* Recommended Anime */}
          {anime.recommendedAnimeList?.length ? (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Recommended Anime</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {anime.recommendedAnimeList.map((recAnime) => (
                  <div
                    key={recAnime.animeId}
                    className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                  >
                    <Link href={`/anime/${recAnime.animeId}`} className="block">
                      <div className="relative w-full h-52 md:h-60">
                        <Image
                          src={recAnime.poster}
                          alt={recAnime.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                          {recAnime.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Click for details
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-gray-500">No recommended anime available</p>
          )}

          {/* Episode List */}
          {anime.episodeList?.length ? (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Episodes</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {anime.episodeList
                  .slice()
                  .reverse()
                  .map((episode, index) => (
                    <Link
                      key={episode.episodeId}
                      href={`/episode/${episode.episodeId}`}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition duration-200"
                    >
                      Episode {episode.number || index + 1}
                    </Link>
                  ))}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-gray-500">No episodes available</p>
          )}
        </div>
      </div>
    </div>
  );
}
