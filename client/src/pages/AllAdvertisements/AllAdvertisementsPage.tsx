import { useState, useCallback } from 'react';
import { useAdvertisements } from "../../store/api/advertisements/advertisementsApi.ts";
import { Input } from "../../shared/ui/Input/Input.tsx";
import { Loader } from "../../shared/ui/Loader/Loader.tsx";
import { ErrorCard } from "../../shared/ui/ErrorCard/ErrorCard.tsx";
import { useDebounce } from "../../shared/hooks/useDebounce.ts";
import { AllAdvertisements } from "../../widgets/ui/AllAdvertisements/AllAdvertisements.tsx";

export function AllAdvertisementsPage() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState([]);

    const debouncedSearch = useDebounce(search, 300);

    const { data: advertisementsData, isError, isLoading } = useAdvertisements({
        page,
        search: debouncedSearch,
        filters,
    });

    const handleSearchChange = useCallback((value: string) => {
        setSearch(value);
    }, []);

    const ads = advertisementsData?.ads ?? [];

    return (
        <div>
            <Input
                value={search}
                onChange={handleSearchChange}
                placeholder="Поиск"
                isExistSearchIcon
                isExistsClearIcon
            />

            {isLoading && <Loader />}
            {isError && <ErrorCard />}

            <AllAdvertisements ads={ads} />
        </div>
    );
}
