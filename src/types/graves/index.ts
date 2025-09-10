export type GraveFilter = {
    soldier_name?: string;
    origin?: string;
    new_origin?: string;
    birth_year?: number;
    unit_name?: string;
    death_time?: string;
}

export type Grave = {
    id: number;
    soldierName: string;
    code: number;
    birthYear: number;
    oldCommune: string;
    oldDistrict: string;
    oldProvince: string;
    commune: string;
    district: string;
    province: string;
    unitName: string;
    position: string;
    deathTime: string;
    localBurialAfterMoving: string | null;
    personMoving: string | null;
    line: number;
    lot: number;
    area: number;
}