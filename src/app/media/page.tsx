import PaginationClient from "@/components/PaginationClient";
import MediaCard from "@/components/media/MediaCard";
import Pagination from "@/components/ui/pagination";
import { getMedia } from "@/services/media";
import { Metadata } from "next";

const PER_PAGE = 10;

export const metadata: Metadata = {
  title: "Thư viện hình ảnh/video Nghĩa trang Liệt sĩ Vị Xuyên",
};

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? "1") || 1;
  const pageSize = Number(params?.pageSize ?? PER_PAGE);

  const { data, meta } = await getMedia(page, pageSize);
  const total = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Thư viện hình ảnh và video
          </h1>
        </div>

        <div className="space-y-8">
          {data.length === 0 ? (
            <div className="text-center text-muted-foreground">
              Chưa có nội dung.
            </div>
          ) : (
            data.map((item) => <MediaCard key={item.id} item={item} />)
          )}
        </div>

        {total > 0 && (
          <p className="mt-4 text-right text-sm text-muted-foreground">
            Tổng {total} sự kiện
          </p>
        )}

        {/* Pagination (SSR refresh) */}
        <div className="mt-8 flex justify-center">
          <PaginationClient
            totalRecords={total}
            currentPage={page}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
}
