import type { Status } from "../../../shared/types/types.ts";

export interface AdvertisementsQueryParams {
    page: number;
    search: string;
    minPrice: number;
    maxPrice: string | number | null;
    status: Exclude<Status, 'requestChanges'>[];
    categoryId: number
    sortBy: 'createdAt' | 'price' | 'priority';
    sortOrder?: 'asc' | 'desc';
}
