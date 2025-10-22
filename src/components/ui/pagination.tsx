"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    totalRecords: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    isLoading?: boolean;
    isFetching?: boolean;
    pageSizeOptions?: number[];
    showPageSizeSelector?: boolean;
    showRecordsInfo?: boolean;
}

export default function Pagination({
    totalRecords,
    currentPage,
    pageSize,
    onPageChange,
    onPageSizeChange,
    isLoading = false,
    isFetching = false,
    pageSizeOptions = [10, 20, 50],
    showPageSizeSelector = true,
    showRecordsInfo = true
}: PaginationProps) {
    // Calculate pagination info
    const totalPages = Math.ceil(totalRecords / pageSize);
    const startRecord = totalRecords > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endRecord = Math.min(currentPage * pageSize, totalRecords);

    const handlePageSizeChange = (newPageSize: string) => {
        const size = Number(newPageSize);
        onPageSizeChange(size);
        onPageChange(1); // Reset to first page when changing page size
    };

    const handlePageChange = (newPage: number) => {
        onPageChange(newPage);
    };

    return (
        <div className="flex flex-col gap-4 text-sm text-muted-foreground">
            {/* Records info and page size selector */}
            {(showRecordsInfo || showPageSizeSelector) && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    {showRecordsInfo && (
                        <div className="text-center sm:text-left">
                            Hiển thị {totalRecords > 0 ? `${startRecord}-${endRecord}` : '0'} trong tổng số {totalRecords} mục
                        </div>
                    )}
                    {showPageSizeSelector && (
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                            <span className="text-xs sm:text-sm">Hiển thị:</span>
                            <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                                <SelectTrigger className="w-16 h-8 text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {pageSizeOptions.map((size) => (
                                        <SelectItem key={size} value={size.toString()}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <span className="text-xs sm:text-sm">mục/trang</span>
                        </div>
                    )}
                </div>
            )}
            
            {/* Page navigation */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                    {/* Previous button */}
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1 || isLoading || isFetching}
                        className="text-xs sm:text-sm"
                    >
                        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Trước</span>
                    </Button>
                    
                    {/* Page numbers */}
                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage <= 2) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 1) {
                                pageNum = totalPages - 2 + i;
                            } else {
                                pageNum = currentPage - 1 + i;
                            }
                            
                            return (
                                <Button
                                    key={pageNum}
                                    variant={currentPage === pageNum ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handlePageChange(pageNum)}
                                    disabled={isLoading || isFetching}
                                    className="w-7 h-7 sm:w-8 sm:h-8 p-0 text-xs sm:text-sm"
                                >
                                    {pageNum}
                                </Button>
                            );
                        })}
                        {totalPages > 3 && currentPage < totalPages - 1 && (
                            <>
                                <span className="text-muted-foreground px-1 text-xs">...</span>
                                {/* Last page button */}
                                <Button 
                                    variant={currentPage === totalPages ? "default" : "outline"}
                                    size="sm" 
                                    onClick={() => handlePageChange(totalPages)}
                                    disabled={isLoading || isFetching}
                                    className="w-7 h-7 sm:w-8 sm:h-8 p-0 text-xs sm:text-sm"
                                >
                                    {totalPages}
                                </Button>
                            </>
                        )}
                    </div>
                    
                    {/* Next button */}
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages || isLoading || isFetching}
                        className="text-xs sm:text-sm"
                    >
                        <span className="hidden sm:inline">Sau</span>
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}