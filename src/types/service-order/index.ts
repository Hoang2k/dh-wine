export interface TServiceOrderItem {
    quantity: number;
    unitPrice: number;
    serviceId: number;
    totalAmount: number;
    minPrice?: number;
}

export interface TServiceOrder {
    id?: number;
    orderCode: string;
    siteId: number;
    visitRequestId?: string;
    scheduledAt?: string | null;
    groupName: string;
    contactName: string;
    contactPhone: string;
    note?: string;
    orderItems: TServiceOrderItem[];
    totalAmount: number;
}