import { Pagination } from "@/types/global.types";

export type ParameterGetListGlobal = {
    locale?: string;
    slug?: string;
    pagination?: Pagination;
    filters?: any;
    populate?: any;
}