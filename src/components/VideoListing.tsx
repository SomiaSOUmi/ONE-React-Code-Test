import { useEffect, useMemo, useState } from "react";
import type { Video, VideoFetcher } from "../types";
import FiltersBar, { SortOrder } from "./FiltersBar";
import Pagination from "./Pagination";
import VideoCard from "./VideoCard";

type Props = {
  fetcher: VideoFetcher;
  pageSize?: number;
};

export default function VideoListing({ fetcher, pageSize = 9 }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [page, setPage] = useState(1);

  // Fetch List of videos limited to 18 videos to demo the pagination
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetcher({ limit: 18 });
        if (!cancelled) setVideos(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    let list = videos;

    if (k) {
      list = list.filter((v) => {
        const hay = `${v.title} ${v.description}`.toLowerCase();
        return hay.includes(k);
      });
    }

    list = [...list].sort((a, b) => {
      if (sortOrder === "a-z" || sortOrder === "z-a") {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        const comparison = titleA.localeCompare(titleB);
        return sortOrder === "a-z" ? comparison : -comparison;
      }
      const da = new Date(a.publishedAt).getTime();
      const db = new Date(b.publishedAt).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });

    return list;
  }, [videos, keyword, sortOrder]);

//go back to first page when filtering changes
 useEffect(() => {
    setPage(1);
  }, [keyword, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  return (
    <section className="listing" aria-label="Video listing">
      <div className="listing__toolbar">
        <FiltersBar
          keyword={keyword}
          onKeywordChange={setKeyword}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          resultCount={filtered.length}
          totalCount={videos.length}
        />
      </div>

      {loading && (
        <div role="status" className="listing__state">
          Loading videos…
        </div>
      )}

      {!loading && error && (
        <div role="alert" className="listing__state listing__state--error">
          <div className="listing__errorTitle">Couldn’t load videos</div>
          <div className="listing__errorMsg">{error}</div>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid" role="list" aria-label="Video cards">
            {pageItems.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          <div className="listing__pagination">
            <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}
    </section>
  );
}
