import axiosInstance from "@/axios";
import { TServiceOrder } from "@/types/service-order";

export const createServiceOrder = async (orderData: TServiceOrder) => {
    try {
        const response = await axiosInstance.post({
            url: "/service-order",
            data: orderData
        });

        return response;
    } catch (error) {
        console.error("Error creating service order:", error);
        throw error;
    }
};
