import Image from "next/image";
import Link from "next/link";

interface AnimeCardProps {
  title: string;
  poster: string;
  episodes: number;
  score: string | number;
  animeId: string;
  className?: string;
}

export default function AnimeCard({
  title,
  poster,
  episodes = 0,
  score = "N/A",
  animeId,
}: AnimeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] duration-200 h-full flex flex-col">
      <Link href={`/anime/${animeId}`} className="block h-full flex flex-col">
        {/* Gambar Poster */}
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={poster}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={false}
            quality={75}
          />
          <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-white text-sm">
            ⭐ {score || "N/A"}
          </div>
        </div>

        {/* Info Anime */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 min-h-[48px]">
            {title}
          </h3>
          <span className="text-sm text-gray-600">{episodes} Episodes</span>

          {/* Tombol Watch Now di BAWAH */}
          <div className="mt-auto pt-3">
            <span className="inline-block w-full text-center px-3 py-2 bg-blue-500 text-white text-sm rounded-lg">
              Watch Now
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

