"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users } from "lucide-react";
import BookVisitForm from "@/components/Book-visit/BookVisitForm";
import ListBookVisit from "@/components/Book-visit/ListBookVisit";
import { createBookVisit, getBookVisit } from "@/services/book-visit";
import { TBookVisit, TBookVisitCreate } from "@/types/book-visit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

async function getBookVisitData(params: { org_name?: string; time?: string; page?: number; per_page?: number } = {}) {
  try {
    const response = await getBookVisit(params);
    return response;
  } catch (error) {
    console.error(error);
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        pageSize: 20
      }
    };
  }
}

export default function BookVisitClient() {
  const [tab, setTab] = React.useState("list");
  const [filters, setFilters] = React.useState<{ org_name?: string; time?: string }>({});
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const today = new Date().toISOString().slice(0, 10);
  const queryClient = useQueryClient();

  async function onSubmit(values: TBookVisitCreate) {
    try {
      await createBookVisit({
        ...values,
        time: moment(values.time, 'DD/MM/YYYY HH:mm', true).format('YYYY-MM-DD HH:mm'),
      });
      
      // Invalidate and refetch the book visit query after successful creation
      await queryClient.invalidateQueries({ queryKey: ["book-visit"] });
    } catch (error) {
      console.error("Error creating book visit:", error);
      throw error;
    }
  }

  function handleNavigateToList() {
    setTab("list");
    // Force refetch when navigating to list
    refetch();
  }

  function handleNavigateToHome() {
    window.location.href = "/";
  }

  function handleSearch(params: { org_name?: string; time?: string }) {
    setFilters(params);
    setPage(1);
  }

  function handlePageSizeChange(newPageSize: number) {
    setPageSize(newPageSize);
    setPage(1);
  }

  const { data: bookVisitsData, isLoading, error, refetch, isFetching } = useQuery<any>({
    queryKey: ["book-visit", filters, page, pageSize],
    queryFn: () => getBookVisitData({ ...filters, page, per_page: pageSize }),
    staleTime: 0, // Always consider data stale to ensure fresh data
    refetchOnMount: true, // Enable refetch on mount
  });

  const bookVisits = bookVisitsData?.data || [];
  const totalRecords = bookVisitsData?.meta?.total || 0;
  const currentPage = page;

  function handleRefetchData() {
    refetch();
  }

  return (
    <div className="min-h-[100dvh]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(13,110,0,0.08),transparent_50%),radial-gradient(circle_at_80%_100%,rgba(0,110,189,0.08),transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-30 py-10 md:py-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-emerald-900">
                Đặt lịch viếng
              </h1>
              <p className="text-muted-foreground mt-1 max-w-prose">
                Sắp xếp thời gian viếng thăm một cách trang trọng và thuận tiện.
              </p>
              <p className="text-muted-foreground mt-1 max-w-prose">Quý khách có thể xem danh sách đã đăng ký hoặc tạo đăng ký mới ngay tại đây.</p>
            </div>
            <div className="grid grid-cols-2 divide-x rounded-2xl bg-white/70 backdrop-blur border">
              <div className="p-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-700" />
                <div>
                  <div className="text-xs text-muted-foreground">Ngày hôm nay</div>
                  <div className="font-medium">{today}</div>
                </div>
              </div>
              <div className="p-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-700" />
                <div>
                  <div className="text-xs text-muted-foreground">Khung giờ</div>
                  <div className="font-medium">07:30–17:30</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-30 pb-20">
        <Card className="border-none shadow-lg">
          <CardContent>
            <Tabs value={tab} onValueChange={setTab} className="mt-4">
              <TabsList className="grid grid-cols-2 w-full md:w-[480px] rounded-xl">
                <TabsTrigger value="list">Danh sách đã đặt</TabsTrigger>
                <TabsTrigger value="create">Đăng ký lịch viếng</TabsTrigger>
              </TabsList>

              {/* Tab: List */}
              <TabsContent value="list" className="mt-6">
                <ListBookVisit
                  rows={bookVisits}
                  onAdd={() => setTab("create")}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  error={error instanceof Error ? error.message : undefined}
                  onSearch={handleSearch}
                  totalRecords={totalRecords}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onPageChange={setPage}
                  onPageSizeChange={handlePageSizeChange}
                />
              </TabsContent>

              {/* Tab: Create */}
              <TabsContent value="create" className="mt-6">
                <BookVisitForm
                  onSubmit={onSubmit}
                  onCancel={() => setTab("list")}
                  onNavigateToList={handleNavigateToList}
                  onNavigateToHome={handleNavigateToHome}
                  onRefetchData={handleRefetchData}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
