import { Stack } from "@mui/material";
import { List } from "@mui/icons-material";
import { CustomButton} from "../../../shared/ui/Button/Button.tsx";

interface NavigationAdvertisementsProps {
    onBackToList: () => void;
}

export function NavigationAdvertisements(props: NavigationAdvertisementsProps) {
    const {
        onBackToList,
    } = props;

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <CustomButton
                text="К списку"
                iconLeft={<List />}
                onClick={onBackToList}
            />
        </Stack>
    );
}
