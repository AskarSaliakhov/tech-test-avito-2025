import { OneAdvertisement } from "../../../shared/ui/OneAdvertisement/OneAdvertisement.tsx";
import { Box, Stack } from "@mui/material";

export function AllAdvertisements({ ads }) {

    return (
        <Box>
            <Stack spacing={2}>
                {ads.map((adv) => (
                    <Box
                        key={adv.id}
                        sx={{
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                transition: 'transform 0.2s ease-in-out',
                                boxShadow: 3
                            }
                        }}
                    >
                        <OneAdvertisement
                            image={adv.images[0]}
                            title={adv.title}
                            price={adv.price}
                            status={adv.status}
                            createdAt={adv.createdAt}
                            category={adv.category}
                            priority={adv.priority}
                        />
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}
