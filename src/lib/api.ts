const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/otakudesu";
import type { EpisodeStream } from "@/types";

interface APIResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface AnimeCard {
  title: string;
  poster: string;
  episodes: number;
  score: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
}

interface Anime {
  title: string;
  poster: string;
  episodes: number;
  score: string;
  animeId: string;
}


interface SearchResult {
  animeId: string;
  title: string;
  poster: string;
  episodes: number;
  score: string;
}

async function getAnimeScore(animeId: string): Promise<string | number> {
  try {
    const res = await fetch(`http://localhost:3001/otakudesu/anime/${animeId}`);
    const data = await res.json();

    console.log(`📢 Response dari API untuk ${animeId}:`, data?.data?.score);

    const rawScore = data?.data?.score;
    return rawScore && !isNaN(parseFloat(rawScore)) ? parseFloat(rawScore) : "N/A";
  } catch (error) {
    console.error(`❌ Gagal fetch score untuk ${animeId}:`, error);
    return "N/A";
  }
}


export async function getAnimeList(type: "ongoing" | "completed" | "top-rated") {
  try {
    const response = await fetch(`http://localhost:3001/otakudesu/${type}`);
    const jsonResponse = await response.json();

    const animeArray = jsonResponse.data?.animeList || [];

    if (!Array.isArray(animeArray)) {
      console.error(`Error: API ${type} tidak mengembalikan array!`, jsonResponse);
      return [];
    }

    

    // Ambil skor untuk setiap anime dan pastikan "N/A" tidak hilang
    const animeWithScores = await Promise.all(
      animeArray.map(async (anime) => {
        const score = await getAnimeScore(anime.animeId);
        return {
          animeId: anime.animeId,
          title: anime.title,
          poster: anime.poster || "",
          episodes: anime.episodes || "N/A",
          score: score || "N/A", // Pastikan jika score tidak ada, tetap "N/A"
        };
      })
    );
    

    console.log(`✅ ${type} Anime with Scores:`, animeWithScores);
    return animeWithScores;
  } catch (error) {
    console.error(`❌ Gagal mengambil anime ${type}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan anime dengan rating tertinggi
export async function getTopRatedAnime() {
  const [ongoingAnime, completedAnime] = await Promise.all([
    getAnimeList("ongoing"),
    getAnimeList("completed"),
  ]);

  // Gabungkan ongoing dan completed
  const allAnime = [...ongoingAnime, ...completedAnime];

  // Urutkan berdasarkan skor tertinggi, tetap sertakan "N/A"
  const sortedAnime = allAnime.sort((a, b) => {
    const scoreA = a.score === "N/A" ? -1 : parseFloat(a.score.toString());
    const scoreB = b.score === "N/A" ? -1 : parseFloat(b.score.toString());

    return scoreB - scoreA; // Urutkan dari skor tertinggi ke terendah
  });

  console.log("🔥 Top Rated Anime:", sortedAnime.slice(0, 10));

  return sortedAnime.slice(0, 10); // Ambil 10 anime dengan skor tertinggi
}








export async function getAnimeDetail(animeId: string) {
  const res = await fetch(`${API_BASE_URL}/anime/${animeId}`);
  const data = await res.json();

  console.log("Full API Response:", JSON.stringify(data, null, 2));

  if (!data?.data) {
    throw new Error("Invalid API Response: Missing `data` field");
  }

  // Debug properti dalam `data.data`
  console.log("Genres Available?", "genreList" in data.data);
  console.log("Episodes Available?", "episodeList" in data.data);

  return data.data;
}






// src/lib/api.ts
// src/lib/api.ts
export async function getEpisodeStream(
  episodeId: string
): Promise<EpisodeStream> {
  try {
    console.log("[API] Fetching episode:", episodeId);

    const response = await fetch(`${API_BASE_URL}/episode/${episodeId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Episode tidak ditemukan"
          : `Server error (${response.status})`
      );
    }

    const data = await response.json();

    if (!data.data || !data.ok) {
      throw new Error(data.message || "Invalid response from server");
    }

    return data.data;
  } catch (error) {
    let errorMessage = "Gagal memuat episode: Terjadi kesalahan yang tidak diketahui";

    if (error instanceof Error) {
      errorMessage = `Gagal memuat episode: ${error.message}`;
    }

    console.error("[API] Error:", errorMessage);
    throw new Error(errorMessage);
  }
}




export async function searchAnime(query: string, page: number = 1): Promise<{ animeList: SearchResult[] }> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(`${API_BASE_URL}/search?q=${encodedQuery}&page=${page}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 0 }, // Disable cache for search results
    });

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? 'No results found'
          : `Server error (${response.status})`
      );
    }

    const data = await response.json();
    console.log('API Response:', data); // Debugging

    if (!data.ok || !data.data) {
      throw new Error(data.message || 'Invalid response from server');
    }

    // Perbaikan parsing episodes
    const normalizedResults = (data.data.animeList || []).map((anime: any) => {
      // Jika API tidak memberikan jumlah episode, coba ambil dari judul
      let episodes = anime.episodes && /^\d+$/.test(anime.episodes)
        ? parseInt(anime.episodes)
        : 0;
    
      if (episodes === 0) {
        // Coba ambil jumlah episode dari judul dengan RegEx
        const match = anime.title.match(/\(Episode\s*\d+\s*–\s*(\d+)\)/i);
        if (match && match[1]) {
          episodes = parseInt(match[1]) || 0;
        }
      }
    
      return {
        ...anime,
        episodes,
        score: anime.score?.toString() || 'N/A'
      };
    });

    return {
      animeList: normalizedResults
    };
  } catch (error) {
    console.error('[Search API] Error:', error);
    return { animeList: [] }; // Pastikan return tidak error
  }
}


