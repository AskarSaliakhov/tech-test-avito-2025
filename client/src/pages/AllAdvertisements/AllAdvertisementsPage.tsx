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
} from "@mui/material";

import { Input } from "../../shared/ui/Input/Input";
import { Loader } from "../../shared/ui/Loader/Loader";
import { ErrorCard } from "../../shared/ui/ErrorCard/ErrorCard";
import { AllAdvertisements } from "../../widgets/ui/AllAdvertisements/AllAdvertisements";
import { CustomPagination } from "../../shared/ui/Pagination/Pagination";

import { STATUS } from "../../shared/consts/consts";
import { SORT_OPTIONS, CATEGORIES, STATUSES } from "./consts";
import { filterStyles } from "./styles";

import { useAdvertisementsFilters } from "./hooks/useAdvertisementsFilters";

export function AllAdvertisementsPage() {
    const {
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
    } = useAdvertisementsFilters();

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 3, width: "100%" }}>
                <Input
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Поиск"
                    isExistSearchIcon
                    isExistsClearIcon
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
                <Paper sx={filterStyles.paper}>
                    <Stack spacing={3}>
                        <Typography variant="h6">Фильтры</Typography>

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
                                            <Chip
                                                key={STATUS[value]}
                                                label={STATUS[value]}
                                                size="small"
                                                sx={filterStyles.chip}
                                            />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={filterStyles.menuProps}
                            >
                                {STATUSES.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {STATUS[status]}
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
                                    count={pagination.totalPages}
                                    page={page}
                                    onChange={(_, newPage) => setPage(newPage)}
                                    showFirstButton
                                    showLastButton
                                />

                                <Typography sx={{ mt: 1, color: "text.secondary" }}>
                                    Всего {pagination.totalItems} объявлений
                                </Typography>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
