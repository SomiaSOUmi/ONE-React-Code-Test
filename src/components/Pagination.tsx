type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="pagination__btn"
        onClick={() => onPageChange(clamp(page - 1, 1, totalPages))}
        disabled={!canPrev}
        aria-label="Previous page"
      >
        Prev
      </button>

      <div className="pagination__pages" aria-label="Page numbers">
        {pages.map((p) => (
          <button
            key={p}
            className={`pagination__page ${p === page ? "pagination__page--active" : ""}`}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        className="pagination__btn"
        onClick={() => onPageChange(clamp(page + 1, 1, totalPages))}
        disabled={!canNext}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
