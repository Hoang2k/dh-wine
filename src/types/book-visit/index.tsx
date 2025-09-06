export type TBookVisit = {
    id: string;
    visit_type: number;
    org_name: string;
    representative_name: string;
    time: string;   
    group_size: number;
    location: number;
    phone: string;
}   
export type TBookVisitCreate = {
    visit_type: number;
    org_name: string;
    representative_name: string;
    time: string;   
    group_size: number;
    location: number;
    phone: string;
    date?: string;
}