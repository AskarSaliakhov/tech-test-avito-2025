import { Box, Stack } from "@mui/material";
import { ArrowBack, ArrowForward, List } from "@mui/icons-material";
import { CustomButton} from "../../../shared/ui/Button/Button.tsx";

interface NavigationAdvertisementsProps {
    onBackToList?: () => void;
    onPrevious?: () => void;
    onNext?: () => void;
    disablePrevious?: boolean;
    disableNext?: boolean;
}

export function NavigationAdvertisements(props: NavigationAdvertisementsProps) {
    const {
        onBackToList,
        onPrevious,
        onNext,
        disablePrevious = false,
        disableNext = false,
    } = props;

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <CustomButton
                text="К списку"
                iconLeft={<List />}
                onClick={onBackToList}
            />

            <Box sx={{ display: "flex", gap: 1 }}>
                <CustomButton
                    text="Предыдущее"
                    iconLeft={<ArrowBack />}
                    onClick={onPrevious}
                    disabled={disablePrevious}
                />
                <CustomButton
                    text="Следующее"
                    iconRight={<ArrowForward />}
                    onClick={onNext}
                    disabled={disableNext}
                />
            </Box>
        </Stack>
    );
}
