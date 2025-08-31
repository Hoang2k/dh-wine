"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Grave } from "@/types/graves";


export default function TableComponent({data, total, page, pageSize, onPageChange, isLoading, isFetching, error} : {
  data: Grave[]; total: number; page: number; pageSize: number; onPageChange: (p: number) => void; isLoading?: boolean; isFetching?: boolean; error?: any;
}) {

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Card className="border-2 mt-10 border-memorial-red/20 shadow-[var(--shadow-memorial)] bg-card/90 backdrop-blur-sm">
      <CardHeader>
         <CardTitle className="text-memorial-dark">
          {isLoading ? "Đang tải..." : `Kết quả tìm kiếm (${total} kết quả)`}
          {isFetching && !isLoading ? <span className="ml-2 text-sm opacity-70">(đang cập nhật...)</span> : null}
          {error ? <span className="ml-2 text-sm text-red-600">• {error}</span> : null}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full">
          <div className="min-w-[1200px]">
            <Table className="border-2 border-memorial-red/30">
              <TableHeader>
                <TableRow className="bg-memorial-red/5 border-b border-memorial-red/30">
                  <TableHead
                    rowSpan={2}
                    className="text-center border-r-2 border-memorial-red/30 font-semibold text-memorial-dark"
                  >
                    STT
                  </TableHead>
                  <TableHead
                    colSpan={4}
                    className="text-center border-r-2 border-memorial-red/30 font-semibold text-memorial-dark"
                  >
                    Vị trí mộ liệt sĩ
                  </TableHead>
                  <TableHead
                    colSpan={7}
                    className="text-center border-r-2 border-memorial-red/30 font-semibold text-memorial-dark"
                  >
                    Thông tin về phần mộ
                  </TableHead>
                  <TableHead
                    colSpan={2}
                    className="text-center font-semibold text-memorial-dark"
                  >
                    Thông tin về di chuyển hài cốt liệt sĩ
                  </TableHead>
                </TableRow>
                <TableRow className="bg-memorial-red/5 border-b border-memorial-red/30">
                  <TableHead className="text-center border-r border-memorial-red/20 font-medium text-memorial-dark">
                    Khu
                  </TableHead>
                  <TableHead className="text-center border-r border-memorial-red/20 font-medium text-memorial-dark">
                    Lô
                  </TableHead>
                  <TableHead className="text-center border-r border-memorial-red/20 font-medium text-memorial-dark">
                    Hàng
                  </TableHead>
                  <TableHead className="text-center border-r-2 border-memorial-red/30 font-medium text-memorial-dark">
                    Mộ
                  </TableHead>
                  <TableHead className="text-center border-r border-memorial-red/20 font-medium text-memorial-dark">
                    Họ tên
                  </TableHead>
                  <TableHead className="text-center border-r border-memorial-red/20 font-medium text-memorial-dark">
                    Năm sinh
                  </TableHead>
                  <TableHead className="text-center border-r border-memorial-red/20 font-medium text-memorial-dark">
                    Nguyên quán
                  </TableHead>
                  <TableHead className="text-center border-r border-memorial-red/20 font-medium text-memorial-dark">
                    Nguyên quán (mới)
                  </TableHead>
                  <TableHead className="text-center border-r border-memorial-red/20 font-medium text-memorial-dark">
                    Đơn vị
                  </TableHead>
                  <TableHead className="text-center border-r border-memorial-red/20 font-medium text-memorial-dark">
                    Cấp bậc, chức vụ
                  </TableHead>
                  <TableHead className="text-center border-r-2 border-memorial-red/30 font-medium text-memorial-dark">
                    Ngày hy sinh
                  </TableHead>
                  <TableHead className="text-center border-r border-memorial-red/20 font-medium text-memorial-dark">
                    Địa phương an táng sau khi di chuyển
                  </TableHead>
                  <TableHead className="text-center font-medium text-memorial-dark">
                    Người di chuyển
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-memorial-cream/50 transition-colors border-b border-memorial-red/10"
                  >
                    <TableCell className="text-center border-r-2 border-memorial-red/30 font-medium">
                      {(page - 1) * pageSize + index + 1}
                    </TableCell>
                    <TableCell className="text-center border-r border-memorial-red/20">
                      {item.line.lot.area.code}
                    </TableCell>
                    <TableCell className="text-center border-r border-memorial-red/20">
                      {item.line.lot.code}
                    </TableCell>
                    <TableCell className="text-center border-r border-memorial-red/20">
                      {item.line.code}
                    </TableCell>
                    <TableCell className="text-center border-r-2 border-memorial-red/30">
                      {item.code}
                    </TableCell>
                    <TableCell className="font-semibold text-memorial-dark border-r border-memorial-red/20">
                      {item.soldierName}
                    </TableCell>
                    <TableCell className="text-center border-r border-memorial-red/20">
                      {item.birthYear}
                    </TableCell>
                    <TableCell className="border-r border-memorial-red/20">
                      {[item.oldCommune, item.oldDistrict, item.oldProvince].filter(Boolean).join(', ')}
                    </TableCell>
                    <TableCell className="border-r border-memorial-red/20">
                      {[item.commune, item.district, item.province].filter(Boolean).join(', ')}
                    </TableCell>
                    <TableCell className="border-r border-memorial-red/20">
                      {item.unitName}
                    </TableCell>
                    <TableCell className="text-center border-r border-memorial-red/20">
                      {item.position}
                    </TableCell>
                    <TableCell className="text-center border-r-2 border-memorial-red/30">
                      {item.deathTime}
                    </TableCell>
                    <TableCell className="border-r border-memorial-red/20">
                      {item.localBurialAfterMoving}
                    </TableCell>
                    <TableCell>{item.personMoving}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => onPageChange(page - 1)}
                      className="cursor-pointer hover:bg-memorial-cream/70"
                    />
                  </PaginationItem>
                )}

                {/* First page shortcut */}
                {page > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => onPageChange(1)}
                        className="cursor-pointer hover:bg-memorial-cream/70"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {page > 4 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                  </>
                )}

                {/* Windowed pages */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p >= Math.max(1, page - 2) &&
                      p <= Math.min(totalPages, page + 2)
                  )
                  .map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        onClick={() => onPageChange(p)}
                        isActive={p === page}
                        className="cursor-pointer hover:bg-memorial-cream/70"
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {/* Last page shortcut */}
                {page < totalPages - 2 && (
                  <>
                    {page < totalPages - 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => onPageChange(totalPages)}
                        className="cursor-pointer hover:bg-memorial-cream/70"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => onPageChange(page + 1)}
                      className="cursor-pointer hover:bg-memorial-cream/70"
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
