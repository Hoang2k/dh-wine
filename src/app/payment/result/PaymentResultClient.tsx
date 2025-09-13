"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

interface PaymentResult {
  success: boolean;
  orderCode?: string;
  amount?: number;
  message?: string;
  transactionId?: string;
}

export default function PaymentResultClient() {
  const searchParams = useSearchParams();
  const [paymentResult, setPaymentResult] = React.useState<PaymentResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Parse URL parameters from VNPay return
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus');
    const vnp_TxnRef = searchParams.get('vnp_TxnRef');
    const vnp_Amount = searchParams.get('vnp_Amount');
    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');

    // Determine payment status
    const isSuccess = vnp_ResponseCode === '00' && vnp_TransactionStatus === '00';
    
    const result: PaymentResult = {
      success: isSuccess,
      orderCode: vnp_TxnRef || undefined,
      amount: vnp_Amount ? parseInt(vnp_Amount) / 100 : undefined, // VNPay returns amount in cents
      transactionId: vnp_TransactionNo || undefined,
      message: isSuccess 
        ? 'Thanh toán thành công!' 
        : 'Thanh toán thất bại. Vui lòng thử lại.'
    };

    setPaymentResult(result);
    setIsLoading(false);

    // Clear cart and localStorage on successful payment
    if (isSuccess) {
      localStorage.removeItem('cart-items');
      localStorage.removeItem('selected-items');
      localStorage.removeItem('fromBookVisit');
      localStorage.removeItem('bookVisitData');
      localStorage.removeItem('directFromBookVisit');
    }
  }, [searchParams]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-8 w-8 mx-auto text-muted-foreground animate-spin mb-4" />
          <p className="text-muted-foreground">Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh]">
      {/* Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center pb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: paymentResult?.success ? '#10b981' : '#ef4444',
                  color: 'white'
                }}
              >
                {paymentResult?.success ? (
                  <CheckCircle className="h-8 w-8" />
                ) : (
                  <XCircle className="h-8 w-8" />
                )}
              </motion.div>
              
              <CardTitle className="text-xl">
                {paymentResult?.message}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Payment Details */}
              {paymentResult?.success && (
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 text-emerald-900">Chi tiết giao dịch</h3>
                  <div className="space-y-2 text-sm">
                    {paymentResult.orderCode && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mã đơn hàng:</span>
                        <span className="font-medium">{paymentResult.orderCode}</span>
                      </div>
                    )}
                    {paymentResult.amount && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Số tiền:</span>
                        <span className="font-medium text-emerald-600">
                          {formatPrice(paymentResult.amount)}
                        </span>
                      </div>
                    )}
                    {paymentResult.transactionId && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mã giao dịch:</span>
                        <span className="font-medium">{paymentResult.transactionId}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Thời gian:</span>
                      <span className="font-medium">
                        {new Date().toLocaleString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Badge */}
              <div className="text-center">
                <Badge 
                  variant={paymentResult?.success ? "default" : "destructive"}
                  className="text-lg px-4 py-2"
                >
                  {paymentResult?.success ? 'Thành công' : 'Thất bại'}
                </Badge>
              </div>

              {/* Next Steps */}
              <div className="text-center space-y-4">
                {paymentResult?.success ? (
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mã đơn hàng: <span className="font-medium">{paymentResult.orderCode}</span>
                    </p>
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
                
                {paymentResult?.success ? (
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/offering">
                      Tiếp tục mua sắm
                    </Link>
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
