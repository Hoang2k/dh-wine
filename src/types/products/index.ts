export interface IProductCategory {
    id: string;
    name: string;
    description: string;
}

export interface IProductInventory {
    id: string;
    quantity: number;
}

export interface IDiscount {
    id: string;
    name: string;
    description: string;
    discount_percent: number;
    active: number;
}


export interface IProduct {
    id: string;
    name: string;
    description: string;
    sku: string;
    price: number;
    category: IProductCategory;
    inventory: IProductInventory;
    discount: IDiscount;
}

