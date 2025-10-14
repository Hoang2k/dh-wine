"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { getVNPayResult } from "@/services/payment";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-toastify";



type ResultDTO = {
  success: boolean;
  orderCode?: string | null;
  amount?: number | null;
  transactionId?: string | null;
  payDate?: string | null;
};

const RESULT_ENDPOINT = `/api/v1/payments/vnpay/result`;


export default function PaymentResultClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { deselectAllItems, removeSelectedItems } = useCart();
  const [isBootLoading, setIsBootLoading] = React.useState(true);
  const [isDetailLoading, setIsDetailLoading] = React.useState(false);
  const [result, setResult] = React.useState<ResultDTO | null>(null);
  const hasCleanedUp = React.useRef(false);


  React.useEffect(() => {
    const successParam = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const successFromQuery = successParam === "1";

    setResult({
      success: successFromQuery,
      orderCode: orderId ?? undefined,
      amount: undefined,
      transactionId: undefined,
      payDate: undefined,
    });
    setIsBootLoading(false);

    if (orderId) {
      const url = RESULT_ENDPOINT;
      (async () => {
        setIsDetailLoading(true);
        try {
             const data = await getVNPayResult(orderId);
                
  
          setResult((prev) => ({
            ...(prev || {}),
            success: !!data?.success,
            orderCode: data?.orderCode ?? prev?.orderCode ?? orderId,
            amount: typeof data?.amount === "number" ? data?.amount : prev?.amount,
            transactionId: data?.transactionId ?? prev?.transactionId,
            payDate: data?.payDate ?? prev?.payDate,
          }));
  
          if (data?.success) {
            try {
              localStorage.removeItem("selected-items");
              localStorage.removeItem("fromBookVisit");
              localStorage.removeItem("bookVisitData");
              localStorage.removeItem("directFromBookVisit");
              
            } catch {}
          }
        } catch (error) {
          // Axios interceptor already shows error toast from backend
          // Just redirect to home page
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } finally {
          setIsDetailLoading(false);
        }
      })();
    }
  }, [searchParams, router]);

  // remove selected items from cart
  React.useEffect(() => {
    if (result?.success && !hasCleanedUp.current) {
      hasCleanedUp.current = true;
      try {
        removeSelectedItems(); // remove selected items from cart
        localStorage.removeItem("selected-items");
      } catch {}
    }
  }, [result?.success, removeSelectedItems]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const renderTime = () => {
    if (result?.payDate) {
      try {
        const d = new Date(result.payDate);
        if (!isNaN(d.getTime())) return d.toLocaleString("vi-VN");
      } catch {}
    }
    return new Date().toLocaleString("vi-VN");
  };

  if (isBootLoading || !result) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-8 w-8 mx-auto text-muted-foreground animate-spin mb-4" />
          <p className="text-muted-foreground">Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    );
  }

  // When user visits /payment/result without query params
  const missingParams =
    !searchParams.get("success") && !searchParams.get("orderId");
  if (missingParams) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <div className="mx-auto mb-2 w-16 h-16 rounded-full flex items-center justify-center bg-gray-200 text-gray-600">
            <Clock className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold">Không có thông tin giao dịch</h2>
          <p className="text-muted-foreground">
            Vui lòng bắt đầu thanh toán từ giỏ hàng hoặc quay lại trang chủ.
          </p>
          <div className="flex gap-3 justify-center">
            <Button asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Về trang chủ
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/gio-hang">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Về giỏ hàng
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isSuccess = !!result.success;

  return (
    <div className="min-h-[100dvh]">
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center pb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: isSuccess ? "#10b981" : "#ef4444", color: "white" }}
              >
                {isSuccess ? <CheckCircle className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
              </motion.div>

              <CardTitle className="text-xl">
                {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại. Vui lòng thử lại."}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Payment Details */}
              {isSuccess && (
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-emerald-900">Chi tiết giao dịch</h3>
                    {isDetailLoading && (
                      <span className="text-xs text-emerald-700">Đang tải chi tiết…</span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    {result.orderCode && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mã đơn hàng:</span>
                        <span className="font-medium">{result.orderCode}</span>
                      </div>
                    )}

                    {typeof result.amount === "number" && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Số tiền:</span>
                        <span className="font-medium text-emerald-600">
                          {formatPrice(result.amount)}
                        </span>
                      </div>
                    )}

                    {result.transactionId && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mã giao dịch:</span>
                        <span className="font-medium">{result.transactionId}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Thời gian:</span>
                      <span className="font-medium">{renderTime()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Badge */}
              <div className="text-center">
                <Badge variant={isSuccess ? "default" : "destructive"} className="text-lg px-4 py-2">
                  {isSuccess ? "Thành công" : "Thất bại"}
                </Badge>
              </div>

              {/* Next Steps */}
              <div className="text-center space-y-4">
                {isSuccess ? (
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                    </p>
                    {result.orderCode && (
                      <p className="text-sm text-muted-foreground">
                        Mã đơn hàng: <span className="font-medium">{result.orderCode}</span>
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Thanh toán không thành công. Vui lòng kiểm tra lại thông tin và thử lại.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ với chúng tôi để được hỗ trợ.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Về trang chủ
                  </Link>
                </Button>

                {isSuccess ? (
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/offering">Tiếp tục mua sắm</Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/cart">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Thử lại thanh toán
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}