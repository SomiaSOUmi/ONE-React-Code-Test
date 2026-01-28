import { ChangeEvent } from "react";

export type SortOrder = "newest" | "oldest" | "a-z" | "z-a";

type Props = {
  keyword: string;
  onKeywordChange: (v: string) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (v: SortOrder) => void;
  resultCount: number;
  totalCount: number;
};

export default function FiltersBar({
  keyword,
  onKeywordChange,
  sortOrder,
  onSortOrderChange,
  resultCount,
  totalCount,
}: Props) {
  const handleClearSearch = () => {
    onKeywordChange("");
  };

  return (
    <div className="filters" aria-label="Filters">
      <div className="filters__search-wrapper">
        <input
          id="keyword"
          className="filters__search"
          placeholder="Search videos..."
          value={keyword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onKeywordChange(e.target.value)}
          aria-label="Filter videos by keyword"
        />
        <span className="filters__search-icon">🔍</span>
        {keyword && (
          <button
            className="filters__clear-btn"
            onClick={handleClearSearch}
            aria-label="Clear search"
            type="button"
          >
            ✕
          </button>
        )}
      </div>

      <select
        id="sort"
        className="filters__sort"
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as any)}
        aria-label="Sort videos"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>

      <div className="filters__results" aria-label="Result count">
        <span className="filters__results-count">{resultCount}</span>
        <span className="filters__results-text">of {totalCount}</span>
      </div>
    </div>
  );
}
