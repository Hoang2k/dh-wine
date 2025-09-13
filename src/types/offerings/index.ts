import { TMedia } from "../media";

export type TServiceItem = {
    id: string | number;
    code: string; // unique code e.g., WREATH_FRESH_RING
    name: string;
    kind: number; // 1=wreath,2=temple_offering,3=memorial_offering,4=incense
    material?: number; // fresh|dry (for wreath); optional if not applicable
    unit: string; // Vòng/Cây/Lẵng/Mâm/Bó

    // Pricing
    pricingType: number; // 1=fixed, 2=choices, 3=min_only
    unitPrice?: number; // when pricing_type is fixed
    priceChoices?: number[]; // when pricing_type is choices
    min_price?: number; // when pricing_type is min_only

    // Quantity
    modeQty: number; // 1=fixed, 2=choice, 3=range
    fixedQty?: number; // when mode_qty is fixed
    choicesQty?: number[]; // when mode_qty is choices
    minQty?: number; // when mode is range (default 1)
    maxQty?: number; // when mode is range

    isActive: 0 | 1;
    image_media_id?: number | string; // media id or url depending on API
    created_at: string; // ISO datetime
    updated_at?: string; // ISO datetime if provided

    // Backward compatibility (optional fields used previously)
    description?: string;
    stockQuantity?: number;
    imageMedia?: TMedia;
};

export type TCartItem = {
    service_item: TServiceItem;
    quantity: number;
};

export type TCart = {
    items: TCartItem[];
    total: number;
};
