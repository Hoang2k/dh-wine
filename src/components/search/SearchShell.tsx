'use client';
import SearchFormComponent from "./SearchFormComponent";
import TableComponent from "./TableComponent";
import { getGraves } from "@/services/graves-search";
import { GraveFilter } from "@/types/graves";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

const initialFilters = {
  soldier_name: "",
  origin: "",
  new_origin: "",
  birth_year: undefined,
  unit_name: "",
  death_time: "",
};

export default function SearchShell() {
  const [filters, setFilters] = useState<GraveFilter>(initialFilters);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const hasAnyFilter = useMemo(
    () =>
      Object.values(filters).some(
        (v) => (v ?? "").toString().trim().length > 0
      ),
    [filters]
  );

  const {
    data: data,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery<any>({
    queryKey: ["graves", filters, page, pageSize],
    queryFn: () => getGraves({ ...filters, page, pageSize }),
  });

  const handleSubmit = useCallback((f: GraveFilter) => {
    setFilters(f);
    setPage(1); 
  }, []);

  const handleReset = useCallback(() => {
    setFilters(initialFilters);
    setPage(1);
  }, []);

  return (
    <>
      <SearchFormComponent
        value={filters}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
      <TableComponent
        data={data?.data ?? []}
        total={data?.meta?.total ?? 0}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error instanceof Error ? error.message : undefined}
      />
    </>
  );
}
