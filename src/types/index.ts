export interface AnimeDetail {
  animeId: string;
  title: string;
  synonyms?: string[];
  score?: number;
  status: string;
  episodes?: number;
  type?: string;
  studio?: string;
  duration?: string;
  year?: number;
  poster: string;
  synopsis?: {
    paragraphs: string[];
  };
  genreList?: Genre[];
  recommendedAnimeList?: RecommendedAnime[];
  episodeList?: Episode[];
}

export interface Genre {
  title: string;
  href: string;
}

export interface RecommendedAnime {
  animeId: string;
  title: string;
  poster: string;
}

export interface Episode {
  episodeId: string;
  number: number;
  title?: string;
}




// Tambahkan atau update interface yang sudah ada
// src/types/index.ts
export interface StreamingServer {
    title: string;
    serverId: string;
    href: string;
  }
  
  export interface Quality {
    title: string;
    serverList: StreamingServer[];
  }
  
  export interface ServerData {
    qualities: Quality[];
  }
  
  export interface DownloadUrl {
    title: string;
    size: string;
    urls: {
      title: string;
      url: string;
    }[];
  }
  
  export interface EpisodeStream {
    title: string;
    animeId: string;
    releaseTime: string;
    defaultStreamingUrl: string;
    server: ServerData;
    downloadUrl: {
      qualities: DownloadUrl[];
    };
    hasPrevEpisode: boolean;
    hasNextEpisode: boolean;
    prevEpisode: null | {
      title: string;
      episodeId: string;
      href: string;
      otakudesuUrl: string;
    };
    nextEpisode: null | {
      title: string;
      episodeId: string;
      href: string;
      otakudesuUrl: string;
    };
  }

  export interface StreamingUrlResponse {
    success: boolean;
    message?: string;
    data?: {
      streamingUrl: string;
    };
  }

