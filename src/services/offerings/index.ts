import axiosInstance from "@/axios";
import { TServiceItem } from "@/types/offerings";

export const getServiceItems = async (params?: { 
    category?: string; 
    search?: string; 
    page?: number; 
    per_page?: number 
}): Promise<{ data: TServiceItem[]; meta: { page: number; perPage: number; total: number; totalPages: number } }> => {
    try {
        console.log("Fetching service items with params:", params);
        const response = await axiosInstance.get({
            url: "/service-item",
            params
        });
        console.log("Service items API response:", response);
        return response;
    } catch (error) {
        console.error("Error fetching service items:", error);
        throw error;
    }
};

export const getServiceItemById = async (id: string): Promise<TServiceItem> => {
    try {
        console.log("Fetching service item by ID:", id);
        const response = await axiosInstance.get({
            url: `/service-item/${id}`
        });
        console.log("Service item API response:", response.data);
        return response; // Changed from response to response.data
    } catch (error) {
        console.error("Error fetching service item:", error);
        throw error;
    }
};
