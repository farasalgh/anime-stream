// src/app/episode/[id]/page.tsx
import { getEpisodeStream } from "@/lib/api";
import VideoPlayer from "@/components/VideoPlayer";
import type { EpisodeStream } from "@/types";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EpisodePage({ params }: PageProps) {
  try {
    const episodeId = params.id; // tidak perlu await params
    console.log('[Page] Fetching episode:', episodeId);
    
    const episode = await getEpisodeStream(episodeId);
    console.log('[Page] Successfully fetched episode:', episode.title);

    // Transform server data untuk VideoPlayer
    const servers = episode.server.qualities.flatMap(quality => 
      quality.serverList.map(server => ({
        ...server,
        quality: quality.title,
        // Ubah href untuk mengarah ke API endpoint yang benar
        fullUrl: `${process.env.NEXT_PUBLIC_API_URL}/server/${server.serverId}`
      }))
    );

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{episode.title}</h1>

        {servers.length > 0 ? (
          <VideoPlayer 
            servers={servers} 
            title={episode.title}
            defaultStreamingUrl={episode.defaultStreamingUrl}
          />
        ) : (
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white">
            Tidak ada server streaming yang tersedia
          </div>
        )}

        {/* Download Section */}
        {episode.downloadUrl?.qualities?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Download</h2>
            <div className="space-y-6">
              {episode.downloadUrl.qualities.map((quality, index) => (
                <div
                  key={`quality-${index}`}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">{quality.title}</h3>
                    <span className="text-sm text-gray-500">{quality.size}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {quality.urls.map((url, urlIndex) => (
                      <a
                        key={`url-${index}-${urlIndex}`}
                        href={url.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-center text-sm"
                      >
                        {url.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          {episode.prevEpisode && (
            <a
              href={`/episode/${episode.prevEpisode.episodeId}`}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              ← Episode Sebelumnya
            </a>
          )}
          {episode.nextEpisode && (
            <a
              href={`/episode/${episode.nextEpisode.episodeId}`}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Episode Selanjutnya →
            </a>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('[Page] Error:', error);
    throw error;
  }
}