"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search, Plus, Calendar, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { TBookVisit } from "@/types/book-visit";
import moment from 'moment';


function Toolbar({ onAdd, keyword, setKeyword, date, setDate, onSearch, isLoading, isFetching }: { 
    onAdd: () => void; 
    keyword: string; 
    setKeyword: (v: string) => void;
    date: string;
    setDate: (v: string) => void;
    onSearch: () => void;
    isLoading: boolean;
    isFetching: boolean;
}) {
    const [displayDate, setDisplayDate] = React.useState(date);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDisplayDate(value);
        setDate(value);
    };

    const handleDateFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.type = 'datetime-local';
        e.target.value = displayDate || '';
    };

    const handleDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.type = 'text';
        e.target.value = displayDate ? moment(displayDate).format('HH:mm DD/MM/YYYY') : '';
    };

    // Sync displayDate with date prop
    React.useEffect(() => {
        setDisplayDate(date);
    }, [date]);
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 w-full md:w-[420px]">
                    <div className="relative w-full flex gap-x-8">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Tìm theo tên cá nhân/tập thể"
                            className="pl-9"
                        />
                    </div>
                </div>
                <div className="relative ">
                    <Calendar className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                        value={displayDate ? moment(displayDate).format('HH:mm DD/MM/YYYY') : ''} 
                        onChange={handleDateChange}
                        id="date" 
                        type="text" 
                        className="pl-9" 
                        placeholder="HH:mm DD/MM/YYYY"
                        onFocus={handleDateFocus}
                        onBlur={handleDateBlur}
                    />
                </div>
                <Button 
                    onClick={onSearch} 
                    className="gap-2 bg-emerald-700 hover:bg-emerald-800" 
                    disabled={isLoading || isFetching}
                >
                    {isLoading || isFetching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Search className="h-4 w-4" />
                    )}
                    {isLoading || isFetching ? "Đang tìm..." : "Tìm kiếm"}
                </Button>
            </div>


            <div className="flex items-center gap-2">
                <Button onClick={onAdd} className="gap-2 bg-emerald-700 hover:bg-emerald-800">
                    <Plus className="h-4 w-4" /> Đăng ký mới
                </Button>
            </div>
        </div>
    );
}

interface ListBookVisitProps {
    rows: TBookVisit[];
    onAdd: () => void;
    isLoading: boolean;
    isFetching: boolean;
    error: string | undefined;
    onSearch: (params: { org_name?: string; time?: string }) => void;
    totalRecords?: number;
    currentPage?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
}

export default function ListBookVisit({ 
    rows, 
    onAdd, 
    isLoading, 
    isFetching, 
    error, 
    onSearch, 
    totalRecords = 0, 
    currentPage = 1, 
    pageSize = 20,
    onPageChange
}: ListBookVisitProps) {
    const [keyword, setKeyword] = React.useState("");
    const [date, setDate] = React.useState("");
    const [localPageSize, setLocalPageSize] = React.useState(pageSize);
    const [localCurrentPage, setLocalCurrentPage] = React.useState(currentPage);

    const handleSearch = () => {
        const searchParams: { org_name?: string; time?: string } = {};
        
        if (keyword.trim()) {
            searchParams.org_name = keyword.trim();
        }
        
        if (date) {
            // Convert datetime-local to YYYY-MM-DD HH:mm format for search
            const momentDate = moment(date);
            searchParams.time = momentDate.format('YYYY-MM-DD HH:mm');
        }
        
        onSearch(searchParams);
    };

    const handlePageSizeChange = (newPageSize: string) => {
        const size = Number(newPageSize);
        setLocalPageSize(size);
        if (onPageChange) {
            onPageChange(1); // Reset to first page when changing page size
        }
    };

    const handlePageChange = (newPage: number) => {
        setLocalCurrentPage(newPage);
        if (onPageChange) {
            onPageChange(newPage);
        }
    };

    // Sync local state with props
    React.useEffect(() => {
        setLocalCurrentPage(currentPage);
    }, [currentPage]);

    React.useEffect(() => {
        setLocalPageSize(pageSize);
    }, [pageSize]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalRecords / localPageSize);
    const startRecord = (localCurrentPage - 1) * localPageSize + 1;
    const endRecord = Math.min(localCurrentPage * localPageSize, totalRecords);


    return (
        <div className="space-y-4">
            <Toolbar 
                onAdd={onAdd} 
                keyword={keyword} 
                setKeyword={setKeyword} 
                date={date}
                setDate={setDate}
                onSearch={handleSearch}
                isLoading={isLoading}
                isFetching={isFetching}
            />
            <div className="overflow-x-auto rounded-xl border bg-white">
                <table className="w-full text-sm">
                    <thead className="bg-emerald-50/70 text-emerald-900">
                        <tr>
                            {[
                                "STT",
                                "Ngày đăng ký",
                                "Người đăng ký",
                                "Trưởng đoàn",
                                "Số người",
                            ].map((h) => (
                                <th key={h} className="text-left font-medium px-4 py-3 whitespace-nowrap">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-10 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="text-muted-foreground">Đang tải dữ liệu...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <>
                        {rows.map((r, index) => (
                            <tr key={r.id} className="border-t hover:bg-muted/40">
                                <td className="px-4 py-3 font-medium whitespace-nowrap">
                                    {(currentPage - 1) * pageSize + index + 1}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">{moment(r.time).format('hh:mm DD/MM/YYYY') || "-"}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{r.org_name}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{r.representative_name}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{r.group_size}</td>
                            </tr>
                        ))}
                                {rows.length === 0 && !isLoading && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                                            Không tìm thấy kết quả phù hợp.
                                        </td>
                                    </tr>
                                )}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                    <div>
                        Hiển thị {totalRecords > 0 ? `${startRecord}-${endRecord}` : '0'} trong tổng số {totalRecords} mục
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Hiển thị:</span>
                        <Select value={localPageSize.toString()} onValueChange={handlePageSizeChange}>
                            <SelectTrigger className="w-20 h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                        <span>mục/trang</span>
                    </div>
                </div>
                
                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handlePageChange(localCurrentPage - 1)}
                            disabled={localCurrentPage <= 1 || isLoading || isFetching}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Trước
                        </Button>
                        
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (localCurrentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (localCurrentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = localCurrentPage - 2 + i;
                                }
                                
                                return (
                                    <Button
                                        key={pageNum}
                                        variant={localCurrentPage === pageNum ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageChange(pageNum)}
                                        disabled={isLoading || isFetching}
                                        className="w-8 h-8 p-0"
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                            {totalPages > 5 && localCurrentPage < totalPages - 2 && (
                                <span className="text-muted-foreground px-2">...</span>
                            )}
                        </div>
                        
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handlePageChange(localCurrentPage + 1)}
                            disabled={localCurrentPage >= totalPages || isLoading || isFetching}
                        >
                            Sau
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        
                        {totalPages > 5 && localCurrentPage < totalPages - 2 && (
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handlePageChange(totalPages)}
                                disabled={isLoading || isFetching}
                                className="ml-2"
                            >
                                {totalPages}
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
