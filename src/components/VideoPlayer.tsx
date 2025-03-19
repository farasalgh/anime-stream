// src/components/VideoPlayer.tsx
'use client';

import { useState, useEffect } from 'react';

interface Server {
  title: string;
  serverId: string;
  href: string;
  quality: string;
  fullUrl: string;
}

interface VideoPlayerProps {
  servers: Server[];
  title: string;
  defaultStreamingUrl: string;
}

export default function VideoPlayer({ servers, title, defaultStreamingUrl }: VideoPlayerProps) {
  const [currentServer, setCurrentServer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streamUrl, setStreamUrl] = useState<string>(defaultStreamingUrl);

  const currentServerData = servers[currentServer];

  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('Fetching stream URL from:', currentServerData.fullUrl);
        
        const response = await fetch(currentServerData.fullUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Stream response:', data);

        // Cek struktur response yang benar
        if (!data.ok || !data.data) {
          throw new Error('Invalid response structure');
        }

        // Cek dan gunakan URL streaming yang tersedia
        const url = data.data.streamingUrl || data.data.url || data.data.stream_url;
        if (!url) {
          throw new Error('No streaming URL found in response');
        }

        // Validasi URL
        if (!url.startsWith('http')) {
          // Jika URL relatif, tambahkan base URL
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
          setStreamUrl(`${baseUrl}${url}`);
        } else {
          setStreamUrl(url);
        }

      } catch (error) {
        console.error('Streaming error:', error);
        setError('Gagal memuat video. Silakan coba server lain.');
        // Fallback ke default streaming URL
        setStreamUrl(defaultStreamingUrl);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentServerData) {
      fetchStreamUrl();
    }
  }, [currentServer, currentServerData, defaultStreamingUrl]);

  const handleServerChange = (index: number) => {
    setCurrentServer(index);
    setIsLoading(true);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-white text-center p-4">
              <p className="mb-4">{error}</p>
              <div className="space-x-4">
                <button
                  onClick={() => handleServerChange(currentServer)}
                  className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                >
                  Coba Lagi
                </button>
                <button
                  onClick={() => setStreamUrl(defaultStreamingUrl)}
                  className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600 transition-colors"
                >
                  Gunakan Server Default
                </button>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            key={streamUrl}
            src={streamUrl}
            title={`${title} - ${currentServerData.title} (${currentServerData.quality})`}
            className="w-full h-full"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setError('Video tidak dapat dimuat');
              setStreamUrl(defaultStreamingUrl);
            }}
          />
        )}
      </div>

      {/* Server Selection */}
      <div className="flex flex-wrap gap-2">
        {servers.map((server, index) => (
          <button
            key={server.serverId}
            onClick={() => handleServerChange(index)}
            className={`
              px-4 py-2 rounded transition-colors
              ${currentServer === index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
              }
            `}
          >
            <span className="font-medium">{server.title}</span>
            <span className="text-sm ml-1 opacity-75">({server.quality})</span>
          </button>
        ))}
      </div>

      {/* Current Server Info */}
      <div className="text-sm text-gray-500">
        Server saat ini: {currentServerData.title} ({currentServerData.quality})
        {error && ' - Menggunakan server default'}
      </div>
    </div>
  );
}