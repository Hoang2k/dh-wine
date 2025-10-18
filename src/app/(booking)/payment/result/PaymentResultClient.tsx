"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, ArrowLeft, Home, X } from "lucide-react";
import Link from "next/link";
import { getVNPayResult, TVNPayResultResponse } from "@/services/payment";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-toastify";

type ResultDTO = {
  success: boolean;
  orderCode?: string | null;
  amount?: number | null;
  transactionId?: string | null;
  payDate?: string | null;
  paymentStatus?: string | null;
};

export default function PaymentResultClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { removeSelectedItems } = useCart();

  const [isBootLoading, setIsBootLoading] = React.useState(true);
  const [isDetailLoading, setIsDetailLoading] = React.useState(false);
  const [result, setResult] = React.useState<ResultDTO | null>(null);

  const hasCleanedUp = React.useRef(false);
  const pollingRef = React.useRef<{ attempts: number }>({ attempts: 0 });
  const isMountedRef = React.useRef(true);

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  React.useEffect(() => {
    // read params
    const successParam = searchParams.get("success");
    const cancelledParam = searchParams.get("cancelled");
    const tokenParam = searchParams.get("token");
    const orderIdForDisplay = searchParams.get("orderId") ?? undefined;
    const successFromQuery = successParam === "1";
    const isCancelled = cancelledParam === "1";

    // initial lightweight UI state (but keep boot loading until fetch finishes)
    setResult({
      success: false, // default false while loading
      orderCode: orderIdForDisplay ?? undefined,
      amount: undefined,
      transactionId: undefined,
      payDate: undefined,
      paymentStatus: isCancelled ? "CANCELLED" : undefined,
    });

    // keep boot loading true until fetch completes
    setIsBootLoading(true);
    setIsDetailLoading(false);

    if (isCancelled) {
      // show cancelled immediately
      setIsBootLoading(false);
      return;
    }

    if (!tokenParam) {
      setIsBootLoading(false);
      toast.warn("Không tìm thấy token xác thực. Vui lòng kiểm tra lại luồng thanh toán hoặc quay lại giỏ hàng.");
      return;
    }

    (async () => {
      setIsDetailLoading(true);
      pollingRef.current.attempts = 0;
      try {
        const data = await fetchResultWithPolling(tokenParam);
        if (!isMountedRef.current) return;

        if (!data) {
          toast.error("Không tìm thấy thông tin đơn hàng. Vui lòng liên hệ hỗ trợ.");
          router.replace("/");
          return;
        }
        
        setResult({
          success: data.success,
          orderCode: data.orderCode ?? orderIdForDisplay ?? undefined,
          amount: typeof data.amount === 'number' ? data.amount : (data.amount ? Number(data.amount) : undefined),
          transactionId: data.transactionId ?? undefined,
          payDate: data.payDate ?? undefined,
        });

        // clear cart only when confirmed success
        if (data.success) {
          try {
            removeSelectedItems();
            localStorage.removeItem("selected-items");
            localStorage.removeItem("fromBookVisit");
            localStorage.removeItem("bookVisitData");
            localStorage.removeItem("directFromBookVisit");
          } catch {}
        }
      } catch (error) {
        console.error("Error fetching payment result:", error);
        toast.error("Lấy kết quả thanh toán thất bại. Vui lòng thử lại sau.");
      } finally {
        if (isMountedRef.current) {
          setIsDetailLoading(false);
          setIsBootLoading(false);
        }
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]);

  // helper: fetch + polling behavior
  async function fetchResultWithPolling(token: string): Promise<TVNPayResultResponse | null> {
    const maxAttempts = 5;
    const intervalMs = 3000;

    while (pollingRef.current.attempts < maxAttempts) {
      pollingRef.current.attempts += 1;
      try {
        const data = await getVNPayResult(token);
        if (!data) return null;

        if (data.success) {
          return data;
        }
      } catch (err) {
        console.error("fetchResultWithPolling attempt error:", err);
        if (isClientError(err)) {
          return null;
        }
      }

      await new Promise((res) => setTimeout(res, intervalMs));
      if (!isMountedRef.current) return null;
    }

    try {
      const last = await getVNPayResult(token);
      return last ?? null;
    } catch (err) {
      console.error("Final fetch attempt failed:", err);
      throw err;
    }
  }

  function isClientError(e: unknown) {
    const anyE = e as any;
    if (anyE && anyE.response && typeof anyE.response.status === 'number') {
      return anyE.response.status >= 400 && anyE.response.status < 500;
    }
    return false;
  }

  React.useEffect(() => {
    if (result?.success && !hasCleanedUp.current) {
      hasCleanedUp.current = true;
      try {
        removeSelectedItems();
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

  const isCancelled = searchParams.get("cancelled") === "1";
  const tokenParam = searchParams.get("token");
  const missingParams = !searchParams.get("success") && !tokenParam && !isCancelled;
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
  const status = String(result.paymentStatus ?? "").toUpperCase();
  const isPending = status === "PENDING" || status === "0" || status === "";

  if (isCancelled) {
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
                  className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center bg-orange-500 text-white"
                >
                  <X className="h-8 w-8" />
                </motion.div>

                <CardTitle className="text-xl text-orange-700">
                  Thanh toán đã bị hủy
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {result.orderCode && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-orange-900">Thông tin đơn hàng</h3>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mã đơn hàng:</span>
                        <span className="font-medium">{result.orderCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Trạng thái:</span>
                        <span className="font-medium text-orange-600">Đã hủy</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <Badge variant="secondary" className="text-lg px-4 py-2 bg-orange-100 text-orange-800 border-orange-200">
                    Đã hủy
                  </Badge>
                </div>

                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Bạn đã hủy quá trình thanh toán. Đơn hàng của bạn vẫn được lưu trong giỏ hàng.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Bạn có thể tiếp tục thanh toán bất cứ lúc nào hoặc thay đổi sản phẩm trong giỏ hàng.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button asChild className="flex-1">
                    <Link href="/gio-hang">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Về giỏ hàng
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/">
                      <Home className="h-4 w-4 mr-2" />
                      Về trang chủ
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Final result view (success or fail)
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

              <div className="text-center">
                <Badge variant={isSuccess ? "default" : "destructive"} className="text-lg px-4 py-2">
                  {isSuccess ? "Thành công" : "Thất bại"}
                </Badge>
              </div>

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

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Về trang chủ
                  </Link>
                </Button>

                {isSuccess ? (
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/dat-do-le">Tiếp tục mua sắm</Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/gio-hang">
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
