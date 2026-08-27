import Link from "next/link";

export function CatalogPagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: URLSearchParams;
}) {
  if (totalPages <= 1) return null;

  function hrefForPage(target: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(target));
    return `/androides?${params.toString()}`;
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      <Link
        href={hrefForPage(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={`flex h-10 w-10 items-center justify-center border border-black/15 text-sm ${
          page === 1 ? "pointer-events-none opacity-30" : "hover:border-black"
        }`}
      >
        ←
      </Link>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <Link
          key={pageNumber}
          href={hrefForPage(pageNumber)}
          className={`flex h-10 w-10 items-center justify-center border text-sm font-bold ${
            pageNumber === page
              ? "border-black bg-black text-white"
              : "border-black/15 hover:border-black"
          }`}
        >
          {pageNumber}
        </Link>
      ))}
      <Link
        href={hrefForPage(Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={`flex h-10 w-10 items-center justify-center border border-black/15 text-sm ${
          page === totalPages ? "pointer-events-none opacity-30" : "hover:border-black"
        }`}
      >
        →
      </Link>
    </nav>
  );
}
