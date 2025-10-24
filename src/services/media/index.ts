import { IResponse } from "@/axios/types";
import { IGallery } from "@/types/media";

export async function getMedia(
  page: number,
  perPage: number
): Promise<IResponse<IGallery[]>> {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL;
    const url = `${base}/gallery?page=${page}&per_page=${perPage}`;
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function getMediaById(id: number): Promise<IGallery> {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL;
    const url = `${base}/gallery/detail/${id}`;
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error('Media not found');
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
