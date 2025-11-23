import React, { useState, useCallback, useEffect } from 'react';
import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Button,
    Stack,
    Typography,
    TextField,
    Paper
} from '@mui/material';

import { useAdvertisements } from "../../store/api/advertisements/advertisementsApi.ts";
import { Input } from "../../shared/ui/Input/Input.tsx";
import { Loader } from "../../shared/ui/Loader/Loader.tsx";
import { ErrorCard } from "../../shared/ui/ErrorCard/ErrorCard.tsx";
import { useDebounce } from "../../shared/hooks/useDebounce.ts";
import { AllAdvertisements } from "../../widgets/ui/AllAdvertisements/AllAdvertisements.tsx";
import { CustomPagination } from "../../shared/ui/Pagination/Pagination.tsx";

import type { Status } from "../../shared/types/types.ts";
import type { SortOrder, SortBy } from "./types.ts";

import { SORT_OPTIONS } from "./consts.ts";
import { filterStyles } from "./styles.ts";

const CATEGORIES = [
    { id: 0, name: "Электроника" },
    { id: 1, name: "Недвижимость" },
    { id: 2, name: "Транспорт" },
    { id: 3, name: "Работа" },
    { id: 4, name: "Услуги" },
    { id: 5, name: "Животные" },
    { id: 6, name: "Мода" },
    { id: 7, name: "Детское" },
] as const;

const STATUSES: Status[] = ['pending', 'approved', 'rejected', 'draft'];

export function AllAdvertisementsPage() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState<SortBy>('createdAt');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    const debouncedSearch = useDebounce(search, 300);
    const debouncedMinPrice = useDebounce(minPrice, 300);
    const debouncedMaxPrice = useDebounce(maxPrice, 300);

    const { data: advertisementsData, isError, isLoading } = useAdvertisements({
        page,
        search: debouncedSearch,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
        status: selectedStatuses,
        categoryId: selectedCategoryId === '' ? undefined : selectedCategoryId,
        sortBy,
        sortOrder,
    });

    const paginationData = advertisementsData?.pagination ?? {};
    const totalPages = paginationData.totalPages ?? 1;
    const totalItems = paginationData.totalItems ?? 0;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    const handleSearchChange = useCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, []);

    const handleStatusChange = (event) => {
        const value = event.target.value;
        setSelectedStatuses(typeof value === 'string' ? value.split(',') : value);
        setPage(1);
    };

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedCategoryId(value === '' ? '' : Number(value));
        setPage(1);
    };

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setMinPrice(Number(value));
        setPage(1);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setMaxPrice(value);
        setPage(1);
    };

    const handleSortChange = (e) => {
        const [by, order] = e.target.value.split('_');
        setSortBy(by as SortBy);
        setSortOrder(order as SortOrder);
        setPage(1);
    };

    const handleResetFilters = () => {
        setSelectedStatuses([]);
        setSelectedCategoryId('');
        setMinPrice(0);
        setMaxPrice('');
        setSearch('');
        setSortBy('createdAt');
        setSortOrder('desc');
        setPage(1);
    };

    const ads = advertisementsData?.ads ?? [];

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 3, width: '100%' }}>
                <Input
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Поиск"
                    isExistSearchIcon
                    isExistsClearIcon
                    fullWidth
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                <Paper sx={filterStyles.paper}>
                    <Stack spacing={3}>
                        <Typography variant="h6" gutterBottom>
                            Фильтры
                        </Typography>

                        <FormControl fullWidth size="small" sx={filterStyles.formControl}>
                            <InputLabel>Статус</InputLabel>
                            <Select
                                multiple
                                value={selectedStatuses}
                                onChange={handleStatusChange}
                                input={<OutlinedInput label="Статус" />}
                                renderValue={(selected) => (
                                    <Box sx={filterStyles.chipsContainer}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} size="small" sx={filterStyles.chip} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={filterStyles.menuProps}
                            >
                                {STATUSES.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth size="small" sx={filterStyles.formControl}>
                            <InputLabel>Категория</InputLabel>
                            <Select
                                value={selectedCategoryId}
                                onChange={handleCategoryChange}
                                input={<OutlinedInput label="Категория" />}
                                MenuProps={filterStyles.menuProps}
                            >
                                {CATEGORIES.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box>
                            <Typography gutterBottom>Диапазон цен</Typography>
                            <Stack direction="row" spacing={1}>
                                <TextField
                                    size="small"
                                    label="Мин"
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                    type="text"
                                    fullWidth
                                />
                                <TextField
                                    size="small"
                                    label="Макс"
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                    type="text"
                                    fullWidth
                                />
                            </Stack>
                        </Box>

                        <FormControl fullWidth size="small">
                            <InputLabel>Сортировка</InputLabel>
                            <Select
                                label="Сортировка"
                                value={`${sortBy}_${sortOrder}`}
                                onChange={handleSortChange}
                            >
                                {SORT_OPTIONS.map((opt) => (
                                    <MenuItem
                                        key={`${opt.sortBy}_${opt.sortOrder}`}
                                        value={`${opt.sortBy}_${opt.sortOrder}`}
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button variant="outlined" onClick={handleResetFilters} fullWidth>
                            Сбросить все фильтры
                        </Button>
                    </Stack>
                </Paper>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                    {isLoading && <Loader />}
                    {isError && <ErrorCard />}

                    {!isLoading && !isError && (
                        <>
                            <AllAdvertisements ads={ads} />

                            <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <CustomPagination
                                    count={totalPages}
                                    page={page}
                                    onChange={(_, newPage) => setPage(newPage)}
                                    showFirstButton
                                    showLastButton
                                />

                                <Typography sx={{ mt: 1, color: "text.secondary" }}>
                                    Всего {totalItems} объявлений
                                </Typography>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
