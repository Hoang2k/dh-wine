"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search, Plus, Calendar, Loader2 } from "lucide-react";
import { TBookVisit } from "@/types/book-visit";
import moment from 'moment';
import Pagination from "../ui/pagination";
import { IColumn } from "@/types/common";


const columns: IColumn[] = [
    {
        header: "STT",
        accessorKey: "stt",
        className: "text-center",
    },
    
    {
        header: "Thời gian",
        accessorKey: "time",
        className: "text-center",
    },
    
    {
        header: "Tên cá nhân/tập thể đăng ký",
        accessorKey: "org_name",
        className: "text-left",
    },
    
    {
        header: "Trưởng đoàn",
        accessorKey: "representative_name",
        className: "text-left",
    },
    
    {
        header: "Chức vụ Đảng, Chính quyền (nếu có) của trưởng đoàn/cá nhân",
        accessorKey: "representative_position", 
        className: "text-center",
    },
    
    {
        header: "Số người",
        accessorKey: "group_size",  
        className: "text-center",
    },
]       


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
        e.target.type = 'date';
        e.target.value = displayDate || '';
    };

    const handleDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.type = 'text';
        e.target.value = displayDate ? moment(displayDate).format('DD/MM/YYYY') : '';
    };

    // Sync displayDate with date prop
    React.useEffect(() => {
        setDisplayDate(date);
    }, [date]);
    return (
        <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input - Full width on mobile, fixed width on desktop */}
            <div className="relative sm:w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Tìm theo tên cá nhân/tập thể"
                    className="pl-9 w-full"
                />
            </div>
            <div className="relative w-full sm:w-[140px] lg:w-[200px]">
                    <Calendar className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                        value={displayDate ? moment(displayDate).format('DD/MM/YYYY') : ''} 
                        onChange={handleDateChange}
                        id="date" 
                        type="text" 
                        className="pl-9 w-full" 
                        placeholder="DD/MM/YYYY"
                        onFocus={handleDateFocus}
                        onBlur={handleDateBlur}
                    />
                </div>
                <Button 
                    onClick={onSearch} 
                    className="gap-2 bg-emerald-700 hover:bg-emerald-800 w-full sm:w-auto whitespace-nowrap" 
                    disabled={isLoading || isFetching}
                    size="sm"
                >
                    {isLoading || isFetching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Search className="h-4 w-4" />
                    )}
                    Tìm kiếm
                </Button>
            </div>

            {/* Add Button Row */}
            <div className="flex justify-end">
                <Button onClick={onAdd} className="gap-2 bg-emerald-700 hover:bg-emerald-800 w-full sm:w-auto">
                    <Plus className="h-4 w-4" /> 
                    <span className="sm:hidden">Đăng ký mới</span>
                    <span className="hidden sm:inline">Đăng ký mới</span>
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
    onPageSizeChange?: (pageSize: number) => void;
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
    onPageChange,
    onPageSizeChange
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
            // Convert datetime-local to YYYY-MM-DD format for search (date only)
            const momentDate = moment(date);
            searchParams.time = momentDate.format('YYYY-MM-DD');
        }
        
        onSearch(searchParams);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setLocalPageSize(newPageSize);
        if (onPageSizeChange) {
            onPageSizeChange(newPageSize);
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
                            {columns.map((h) => (
                                <th key={h.accessorKey} className={`${h.className} font-medium px-4 py-3 whitespace-nowrap`}>
                                    {h.header}
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
                                <td className="px-4 py-3 font-medium whitespace-nowrap text-center">
                                    {(currentPage - 1) * pageSize + index + 1}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-center">{moment(r.time).format('hh:mm DD/MM/YYYY') || "-"}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-left">{r.org_name}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-left">{r.representative_name}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-center">{r.representative_position || "-"}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-center">{r.group_size}</td>
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
            <Pagination
                totalRecords={totalRecords}
                currentPage={localCurrentPage}
                pageSize={localPageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isLoading={isLoading}
                isFetching={isFetching}
            />
        </div>
    );
}
