import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import type { PaginationProps } from './types.ts';

export function CustomPagination(props: PaginationProps) {
    const {
        count,
        page,
        onChange,
        size = "medium",
        color = "primary",
        disabled,
        showFirstButton,
        showLastButton,
    } = props;

    const handlePageChange = (event, newPage: number) => {
        onChange(event, newPage);
    };

    return (
        <Box>
            <Pagination
                count={count}
                page={page}
                onChange={handlePageChange}
                color={color}
                disabled={disabled}
                size={size}
                showFirstButton={showFirstButton}
                showLastButton={showLastButton}
            />
        </Box>
    );
}
