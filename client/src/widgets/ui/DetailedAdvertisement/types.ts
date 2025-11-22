import type { Status, Priority } from "../../../shared/types/types.ts";

interface SellerInfo {
    id: number;
    name: string;
    rating: number;
    registeredAt: string;
    totalAds: string;
}

interface ModerateComment {
    action: string;
    comment: string;
    id: number;
    moderatorId: number;
    moderatorName: string;
    reason: string | null;
    timestamp: string
}


export interface DetailedAdvertisementProps {
    photos: string[];
    title: string;
    price: string;
    category: string;
    status: Status;
    priority: Priority;
    createdAt: string;
    updatedAt: string;
    description: string;
    specifications: Record<string, string>;
    seller: SellerInfo;
    moderationHistory: ModerateComment[];
}
