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


// =======================
// Types
// =======================
type MartyrData = {
  stt: number;
  khu: string;
  lo: string;
  hang: string;
  mo: string;
  hoTen: string;
  namSinh: string;
  nguyenQuan: string;
  nguyenQuanMoi: string;
  donVi: string;
  capBacChucVu: string;
  ngayHySinh: string;
  diaPhuongAnTang: string;
  nguoiDiChuyen: string;
};

// =======================
// Sample data
// =======================
const sampleData: MartyrData[] = [
  {
    stt: 1,
    khu: "A",
    lo: "01",
    hang: "05",
    mo: "12",
    hoTen: "Nguyễn Văn Thành",
    namSinh: "1960",
    nguyenQuan: "Hà Nội",
    nguyenQuanMoi: "Quận Ba Đình, Hà Nội",
    donVi: "Trung đoàn 246",
    capBacChucVu: "Trung sĩ",
    ngayHySinh: "15/02/1979",
    diaPhuongAnTang: "",
    nguoiDiChuyen: "",
  },
  {
    stt: 2,
    khu: "A",
    lo: "02",
    hang: "03",
    mo: "08",
    hoTen: "Trần Minh Đức",
    namSinh: "1958",
    nguyenQuan: "Hải Phòng",
    nguyenQuanMoi: "Quận Hồng Bàng, Hải Phòng",
    donVi: "Tiểu đoàn 3, Trung đoàn 246",
    capBacChucVu: "Thiếu úy",
    ngayHySinh: "17/02/1979",
    diaPhuongAnTang: "",
    nguoiDiChuyen: "",
  },
  {
    stt: 3,
    khu: "B",
    lo: "01",
    hang: "02",
    mo: "15",
    hoTen: "Lê Văn Hùng",
    namSinh: "1961",
    nguyenQuan: "Nam Định",
    nguyenQuanMoi: "Huyện Nghĩa Hưng, Nam Định",
    donVi: "Trung đoàn 148",
    capBacChucVu: "Hạ sĩ",
    ngayHySinh: "20/02/1979",
    diaPhuongAnTang: "Nghĩa trang liệt sĩ Nam Định",
    nguoiDiChuyen: "Gia đình",
  },
  {
    stt: 4,
    khu: "B",
    lo: "03",
    hang: "01",
    mo: "07",
    hoTen: "Phạm Quốc Tuấn",
    namSinh: "1959",
    nguyenQuan: "Thái Bình",
    nguyenQuanMoi: "Huyện Kiến Xương, Thái Bình",
    donVi: "Trung đoàn 356",
    capBacChucVu: "Trung úy",
    ngayHySinh: "22/02/1979",
    diaPhuongAnTang: "",
    nguoiDiChuyen: "",
  },
  {
    stt: 5,
    khu: "C",
    lo: "02",
    hang: "04",
    mo: "09",
    hoTen: "Vũ Đình Long",
    namSinh: "1962",
    nguyenQuan: "Bắc Ninh",
    nguyenQuanMoi: "Huyện Yên Phong, Bắc Ninh",
    donVi: "Tiểu đoàn 2, Trung đoàn 148",
    capBacChucVu: "Binh nhất",
    ngayHySinh: "25/02/1979",
    diaPhuongAnTang: "",
    nguoiDiChuyen: "",
  },
];

// =======================
// Component
// =======================
export default function TableComponent() {
  // state MUST be inside the component
  const [data] = useState<MartyrData[]>(sampleData);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Derived pagination
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <Card className="border-2 mt-10 border-memorial-red/20 shadow-[var(--shadow-memorial)] bg-card/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-memorial-dark">
          Kết quả tìm kiếm ({data.length} kết quả)
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
                {currentData.map((item) => (
                  <TableRow
                    key={item.stt}
                    className="hover:bg-memorial-cream/50 transition-colors border-b border-memorial-red/10"
                  >
                    <TableCell className="text-center border-r-2 border-memorial-red/30 font-medium">
                      {item.stt}
                    </TableCell>
                    <TableCell className="text-center border-r border-memorial-red/20">
                      {item.khu}
                    </TableCell>
                    <TableCell className="text-center border-r border-memorial-red/20">
                      {item.lo}
                    </TableCell>
                    <TableCell className="text-center border-r border-memorial-red/20">
                      {item.hang}
                    </TableCell>
                    <TableCell className="text-center border-r-2 border-memorial-red/30">
                      {item.mo}
                    </TableCell>
                    <TableCell className="font-semibold text-memorial-dark border-r border-memorial-red/20">
                      {item.hoTen}
                    </TableCell>
                    <TableCell className="text-center border-r border-memorial-red/20">
                      {item.namSinh}
                    </TableCell>
                    <TableCell className="border-r border-memorial-red/20">
                      {item.nguyenQuan}
                    </TableCell>
                    <TableCell className="border-r border-memorial-red/20">
                      {item.nguyenQuanMoi}
                    </TableCell>
                    <TableCell className="border-r border-memorial-red/20">
                      {item.donVi}
                    </TableCell>
                    <TableCell className="text-center border-r border-memorial-red/20">
                      {item.capBacChucVu}
                    </TableCell>
                    <TableCell className="text-center border-r-2 border-memorial-red/30">
                      {item.ngayHySinh}
                    </TableCell>
                    <TableCell className="border-r border-memorial-red/20">
                      {item.diaPhuongAnTang || "—"}
                    </TableCell>
                    <TableCell>{item.nguoiDiChuyen || "—"}</TableCell>
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
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="cursor-pointer hover:bg-memorial-cream/70"
                    />
                  </PaginationItem>
                )}

                {/* First page shortcut */}
                {currentPage > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(1)}
                        className="cursor-pointer hover:bg-memorial-cream/70"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {currentPage > 4 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                  </>
                )}

                {/* Windowed pages */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page >= Math.max(1, currentPage - 2) &&
                      page <= Math.min(totalPages, currentPage + 2)
                  )
                  .map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={page === currentPage}
                        className="cursor-pointer hover:bg-memorial-cream/70"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {/* Last page shortcut */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(totalPages)}
                        className="cursor-pointer hover:bg-memorial-cream/70"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
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
