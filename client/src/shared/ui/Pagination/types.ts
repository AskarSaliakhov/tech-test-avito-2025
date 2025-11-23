import type { Size } from "../../types/types.ts";

export interface PaginationProps {
    count: number,
    page: number,
    onChange: void,
    size?: Size,
    color?: "primary" | "secondary" | "standard"
    disabled?: boolean,
    showFirstButton: boolean,
    showLastButton: boolean,
}
