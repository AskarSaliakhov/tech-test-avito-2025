import { Box } from "@mui/material";
import { useAdvertisement } from "../../store/api/advertisements/advertisementsApi.ts";
import { DetailedAdvertisement } from "../../widgets/ui/DetailedAdvertisement/DetailedAdvertisement.tsx";
import { Loader } from "../../shared/ui/Loader/Loader.tsx";
import { ModerationButtons } from "../../widgets/ui/ModerateAdvertisement/ModerateAdvertisement.tsx";
import { ErrorCard } from "../../shared/ui/ErrorCard/ErrorCard.tsx";
import { NavigationAdvertisements } from "../../widgets/ui/NavigationAdvertisements/NavigationAdvertisements.tsx";
import {useNavigate, useParams} from "react-router-dom";

export function DetailedAdvertisementPage() {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const {
        data: oneAdvertisement,
        error: oneAdvertisementError,
        isLoading: isLoadingOneAdvertisement
    } = useAdvertisement(Number(id));

    const backToAddAdvertisement = function () {
        navigate("/ads")
    }

    if (isLoadingOneAdvertisement) return <Loader />;
    if (!isLoadingOneAdvertisement && oneAdvertisementError) return <ErrorCard />;

    return (
        <>
            <NavigationAdvertisements onBackToList={backToAddAdvertisement}/>
            <DetailedAdvertisement
                photos={oneAdvertisement.images}
                title={oneAdvertisement.title}
                price={oneAdvertisement.price}
                category={oneAdvertisement.category}
                status={oneAdvertisement.status}
                priority={oneAdvertisement.priority}
                createdAt={oneAdvertisement.createdAt}
                updatedAt={oneAdvertisement.updatedAt}
                description={oneAdvertisement.description}
                specifications={oneAdvertisement.characteristics}
                seller={oneAdvertisement.seller}
                moderationHistory={oneAdvertisement.moderationHistory}
            />
            <Box display="flex" justifyContent="center" mt={5}>
                <ModerationButtons />
            </Box>
        </>
    );
}
