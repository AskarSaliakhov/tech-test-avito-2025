import type { Status, Priority } from "../../types/types.ts";

export interface OneAdvertisementProps {
    image: string;
    title: string;
    price: number;
    status: Status;
    createdAt: string;
    category: string;
    priority: Priority;
}
