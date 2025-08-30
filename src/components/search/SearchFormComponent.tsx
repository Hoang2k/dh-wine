"use client";

import { useState, useMemo } from "react";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, RotateCcw } from "lucide-react";

// =======================
// Types
// =======================
type TLietSi = {
  hoTen: string;
  nguyenQuan: string;
  nguyenQuanMoi: string;
  namSinh: string; // keep as string for partial search like "195"
  donVi: string;
  ngayHySinh: string; // ISO string or dd/mm/yyyy, we'll do "includes"
};

// =======================
// Mock data (replace with your API results)
// =======================
const sampleData: TLietSi[] = [
  {
    hoTen: "Nguyễn Văn A",
    nguyenQuan: "Hà Nội",
    nguyenQuanMoi: "Đông Anh, Hà Nội",
    namSinh: "1950",
    donVi: "Trung đoàn 1",
    ngayHySinh: "1975-04-30",
  },
  {
    hoTen: "Trần Văn B",
    nguyenQuan: "Nam Định",
    nguyenQuanMoi: "Giao Thủy, Nam Định",
    namSinh: "1948",
    donVi: "Sư đoàn 5",
    ngayHySinh: "1972-08-15",
  },
];

// =======================
// Component
// =======================
export default function SearchFormComponent() {
  const [searchForm, setSearchForm] = useState({
    tenLietSi: "",
    nguyenQuan: "",
    nguyenQuanMoi: "",
    ngaySinh: "",
    donVi: "",
    ngayHySinh: "",
  });

  const [results, setResults] = useState<TLietSi[] | null>(null);

  const hasAnyFilter = useMemo(
    () =>
      Object.values(searchForm).some((v) => (v ?? "").toString().trim().length > 0),
    [searchForm]
  );

  const handleInputChange = (field: keyof typeof searchForm, value: string) => {
    setSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setSearchForm({
      tenLietSi: "",
      nguyenQuan: "",
      nguyenQuanMoi: "",
      ngaySinh: "",
      donVi: "",
      ngayHySinh: "",
    });
    setResults(null);
  };

  const handleSearch = () => {
    console.log(searchForm);
  };

  const onKeyDownSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      {/* ===== Search Card ===== */}
      <Card className="mb-2 border-2 border-memorial-red/20 shadow-[var(--shadow-memorial)] bg-card/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-memorial-dark">Thông tin tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <form onKeyDown={onKeyDownSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="tenLietSi">Tên liệt sĩ</Label>
                <Input
                  id="tenLietSi"
                  value={searchForm.tenLietSi}
                  onChange={(e) => handleInputChange("tenLietSi", e.target.value)}
                  placeholder="Nhập tên liệt sĩ"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nguyenQuan">Nguyên quán</Label>
                <Input
                  id="nguyenQuan"
                  value={searchForm.nguyenQuan}
                  onChange={(e) => handleInputChange("nguyenQuan", e.target.value)}
                  placeholder="Nhập nguyên quán"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nguyenQuanMoi">Nguyên quán (theo nghị quyết mới)</Label>
                <Input
                  id="nguyenQuanMoi"
                  value={searchForm.nguyenQuanMoi}
                  onChange={(e) => handleInputChange("nguyenQuanMoi", e.target.value)}
                  placeholder="Nhập nguyên quán mới"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ngaySinh">Ngày sinh</Label>
                <Input
                  id="ngaySinh"
                  value={searchForm.ngaySinh}
                  onChange={(e) => handleInputChange("ngaySinh", e.target.value)}
                  placeholder="Nhập năm sinh (ví dụ: 1948)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donVi">Đơn vị</Label>
                <Input
                  id="donVi"
                  value={searchForm.donVi}
                  onChange={(e) => handleInputChange("donVi", e.target.value)}
                  placeholder="Nhập đơn vị"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ngayHySinh">Ngày hy sinh</Label>
                <Input
                  id="ngayHySinh"
                  value={searchForm.ngayHySinh}
                  onChange={(e) => handleInputChange("ngayHySinh", e.target.value)}
                  placeholder="Nhập ngày hy sinh (ví dụ: 1975-04-30)"
                />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Làm mới
                </Button>
                <Button type="button" onClick={handleSearch} className="bg-[#087443] hover:bg-[#07683C] hover:cursor-pointer active:bg-[#065D36] text-white transition-colors duration-200">
                  <Search className="w-4 h-4" />
                  Tra cứu
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
