import { OneAdvertisement } from "../../../shared/ui/OneAdvertisement/OneAdvertisement.tsx";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function AllAdvertisements({ ads }) {
    const navigate = useNavigate();

    const handleClick = (id: number) => {
        navigate(`/ads/${id}`);
    };

    return (
        <Box>
            <Stack spacing={2}>
                {ads.map((adv) => (
                    <Box
                        key={adv.id}
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                transition: 'transform 0.2s ease-in-out',
                                boxShadow: 3
                            }
                        }}
                        onClick={() => handleClick(adv.id)}
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
    );
}
