import axiosInstance from "@/axios";
import { TServiceItem } from "@/types/offerings";

export const getServiceItems = async (params?: { 
    search?: string; 
    page?: number; 
    per_page?: number 
}): Promise<{ data: TServiceItem[]; meta: { page: number; perPage: number; total: number; totalPages: number } }> => {
    try {
        const query = new URLSearchParams(params as any).toString();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-item?${query}`, {cache: 'no-store'});
        return await res.json();
    } catch (error) {
        throw error;
    }
};

export const getServiceItemById = async (id: string): Promise<TServiceItem> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-item/${id}`, {cache: 'no-store'}); 
        return response.json(); // Changed from response to response.data
    } catch (error) {
        throw error;
    }
};
