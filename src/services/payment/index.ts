import axiosInstance from "@/axios";

export interface TVNPayCreateRequest {
    orderId: number;
    returnUrl?: string; // Add returnUrl as optional property
}

export interface TVNPayCreateResponse {
    paymentUrl: string;
    orderCode: string;
}

export const createVNPayPayment = async (paymentData: TVNPayCreateRequest): Promise<TVNPayCreateResponse> => {
    try {
        console.log("Creating VNPay payment:", paymentData);
        const response = await axiosInstance.post({
            url: "/payments/vnpay/create",
            data: paymentData
        });
        console.log("VNPay payment created:", response);
        return response;
    } catch (error) {
        console.error("Error creating VNPay payment:", error);
        throw error;
    }
};


export interface TVNPayResultResponse {
    success: boolean;
    orderCode: string;
    amount: number;
    transactionId: string;
    payDate: string;
}

export const getVNPayResult = async (token: string): Promise<TVNPayResultResponse> => {
    try {
        const response = await axiosInstance.get({
            url: `/payments/vnpay/result`,
            params: { token },
        });
        return response;
    }
    catch (error) {
        console.error("Error getting VNPay result:", error);
        throw error;
    }
};      