import { IImage } from "@/types/common";

export interface IAdmin {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    preferedLanguage: string;
    picture: IImage | null;
    createdAt: string;
    updatedAt: string;
}
