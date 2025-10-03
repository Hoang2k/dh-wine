export type TMedia = {
    altText: string;
    createdAt: string;
    id: number;
    kind: number;
    path: string;
    updatedAt: string;
};


export interface IGallery {
    id: number,
    title: string,
    description: string,
    time: string,
    images: string[],
}