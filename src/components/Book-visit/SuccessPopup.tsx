"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SuccessPopupProps {
  isOpen: boolean;
  orgName: string;
  phone: string;
  idBookVisit: number;
  onClose: () => void;
  onNo: () => void;
  onYes: (bookVisitData: any) => void;
  bookVisitData?: any; // Add bookVisitData prop
}

export default function SuccessPopup({ isOpen, orgName, phone, idBookVisit, onClose, onNo, onYes, bookVisitData }: SuccessPopupProps) {
  const handleYes = () => {
    // Save book visit data to localStorage
    if (bookVisitData) {
      localStorage.setItem('bookVisitData', JSON.stringify({...bookVisitData, id: idBookVisit}));
      localStorage.setItem('fromBookVisit', 'true');
      localStorage.setItem('directFromBookVisit', 'true'); // Add this flag
    }
    // Redirect to offering page
    window.location.href = "/offering";
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Success icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Đặt lịch thành công!
              </h3>

              {/* Message */}
              <div className="text-sm text-gray-600 mb-6 space-y-2">
                <p>
                  Bạn đã đặt lịch viếng thành công cho <strong>"{orgName}"</strong>
                </p>
                <p>
                  Thông tin của bạn đã được gửi đến ban quản lý nghĩa trang. 
                  Trong trường hợp có thay đổi, vui lòng liên hệ số điện thoại{" "}
                  <strong>{phone}</strong>
                </p>
                <p className="font-medium text-gray-800 mt-4">
                   Bạn có muốn đặt kèm dịch vụ đồ lễ không ?
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onNo}
                  className="flex-1"
                >
                  Không
                </Button>
                <Button
                  onClick={handleYes}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800"
                >
                  Có
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
