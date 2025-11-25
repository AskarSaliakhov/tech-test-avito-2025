import { useState, useEffect } from "react";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { useAdvertisements } from "../../../store/api/advertisements/advertisementsApi";
import type { Status } from "../../../shared/types/types";
import type { SortBy, SortOrder } from "../types";

export function useAdvertisementsFilters() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState<SortBy>("createdAt");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

    const debouncedSearch = useDebounce(search, 300);
    const debouncedMinPrice = useDebounce(minPrice, 300);
    const debouncedMaxPrice = useDebounce(maxPrice, 300);

    const { data, isError, isLoading } = useAdvertisements({
        page,
        search: debouncedSearch,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
        status: selectedStatuses,
        categoryId: selectedCategoryId === "" ? undefined : selectedCategoryId,
        sortBy,
        sortOrder,
    });

    const ads = data?.ads ?? [];
    const pagination = data?.pagination ?? { totalPages: 1, totalItems: 0 };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setSelectedStatuses(typeof value === "string" ? value.split(",") : value);
        setPage(1);
    }

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategoryId(value === "" ? "" : Number(value));
        setPage(1);
    }

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        setMinPrice(Number(value));
        setPage(1);
    }

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        setMaxPrice(value);
        setPage(1);
    }

    const handleSortChange = (e) => {
        const [by, order] = e.target.value.split("_");
        setSortBy(by as SortBy);
        setSortOrder(order as SortOrder);
        setPage(1);
    }

    const handleResetFilters = () => {
        setSelectedStatuses([]);
        setSelectedCategoryId("");
        setMinPrice(0);
        setMaxPrice("");
        setSearch("");
        setSortBy("createdAt");
        setSortOrder("desc");
        setPage(1);
    }

    return {
        search,
        page,
        selectedStatuses,
        selectedCategoryId,
        minPrice,
        maxPrice,
        sortBy,
        sortOrder,
        ads,
        pagination,
        isError,
        isLoading,
        setPage,
        handleSearchChange,
        handleStatusChange,
        handleCategoryChange,
        handleMinPriceChange,
        handleMaxPriceChange,
        handleSortChange,
        handleResetFilters,
    };
}
