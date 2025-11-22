import {Cancel, CheckCircle, Flag, Schedule, Warning} from "@mui/icons-material";
import type { Status, Priority } from "../../types/types.ts";

export const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
        case 'urgent':
            return <Warning fontSize="small" />;
        case 'normal':
            return <Flag fontSize="small" />;
        default:
            return null;
    }
};

export const getStatusIcon = (status: Status) => {
    switch (status) {
        case 'approved':
            return <CheckCircle fontSize="small" />;
        case 'rejected':
            return <Cancel fontSize="small" />;
        case 'pending':
            return <Schedule fontSize="small" />;
        default:
            return null;
    }
};
