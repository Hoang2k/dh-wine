"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationClient({
  totalRecords,
  currentPage,
  pageSize,
}: {
  totalRecords: number;
  currentPage: number;
  pageSize: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalRecords / pageSize);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());
    router.push(`/media?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`px-3 py-1 border rounded disabled:opacity-50 ${currentPage <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        Trước
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(
          (page) =>
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
        )
        .map((page, idx, arr) => (
          <span key={page} className="flex">
            {idx > 0 && arr[idx - 1] !== page - 1 && (
              <span className="px-2">…</span>
            )}
            <button
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100 cursor-pointer"
              }`}
            >
              {page}
            </button>
          </span>
        ))}

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-3 py-1 border rounded disabled:opacity-50 ${currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        Sau
      </button>
    </div>
  );
}
