import { Button } from "../ui/button";

export default function Pagination({ page, setPage, totalPages = 1 }) {
  const goPrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const goNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPage = (p) => {
    setPage(p);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={goPrev}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-slate-800 text-white disabled:opacity-30"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;

        return (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`px-3 py-1 rounded ${
              page === p
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-white/70"
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={goNext}
        disabled={page === totalPages}
        className="px-3 py-1 rounded bg-slate-800 text-white disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
}
