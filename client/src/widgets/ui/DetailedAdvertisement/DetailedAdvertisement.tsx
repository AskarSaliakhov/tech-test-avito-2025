import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Rating,
    Chip,
} from '@mui/material';
import {
    CurrencyRuble,
    Description,
    ListAlt,
    Person,
    History,
} from '@mui/icons-material';
import { PhotoSlider } from "../../../shared/ui/PhotoSlider/PhotoSlider.tsx";
import type { DetailedAdvertisementProps } from "./types";
import { formatMoney } from "../../../shared/utils/formatMoney.ts";
import { formatDateTime } from "../../../shared/utils/dates/dates.ts";
import { STATUS, PRIORITY } from "./const.ts";

export function DetailedAdvertisement({
                                          photos,
                                          title,
                                          price,
                                          category,
                                          status,
                                          priority,
                                          createdAt,
                                          updatedAt,
                                          description,
                                          specifications,
                                          seller,
                                          moderationHistory,
                                      }: DetailedAdvertisementProps) {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'success';
            case 'rejected':
                return 'error';
            case 'requestChanges':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                gap: 3,
                mb: 4,
                flexDirection: { xs: 'column', md: 'row' }
            }}>
                <Box sx={{ flex: 1.5 }}>
                    <PhotoSlider
                        photos={photos}
                        height={400}
                        showThumbnails={true}
                    />
                </Box>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                            <Typography variant="h5" color="primary" fontWeight="bold">
                                {formatMoney(price)}
                            </Typography>
                            <CurrencyRuble sx={{ color: 'primary.main', size: 'large' }} />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                            <Chip
                                label={category}
                                variant="outlined"
                            />
                            <Chip
                                label={STATUS[status]}
                                color={'approved'}
                            />
                            <Chip
                                label={PRIORITY[priority]}
                                color={priority === 'urgent' ? 'error' : 'primary'}
                                variant="outlined"
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                                Опубликовано:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="black">
                                {formatDateTime(createdAt)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                                Обновлено:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="black">
                                {formatDateTime(updatedAt)}
                            </Typography>
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Person color="primary" />
                            <Typography variant="h6" fontWeight="bold">
                                {seller.name}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                                    Рейтинг
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Rating value={seller.rating} readOnly precision={0.1} size="small" />
                                    <Typography variant="body2" fontWeight="bold" color="black">
                                        {seller.rating}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                                    Объявлений
                                </Typography>
                                <Typography variant="body2" fontWeight="bold" color="black">
                                    {seller.totalAds}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                                    Дата регистрации
                                </Typography>
                                <Typography variant="body2" fontWeight="bold" color="black">
                                    {formatDateTime(seller.registeredAt)}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Description color="primary" />
                        <Typography variant="h5" fontWeight="bold">
                            Описание
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                        {description}
                    </Typography>
                </Paper>

                <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <ListAlt color="primary" />
                        <Typography variant="h5" fontWeight="bold">
                            Характеристики
                        </Typography>
                    </Box>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {Object.entries(specifications).map(([key, value]) => (
                                    <TableRow key={key}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{
                                                fontWeight: 'bold',
                                                borderBottom: '1px solid',
                                                borderBottomColor: 'divider',
                                                pr: 4
                                            }}
                                        >
                                            {key}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: '1px solid',
                                                borderBottomColor: 'divider'
                                            }}
                                        >
                                            {value}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                {moderationHistory && moderationHistory.length > 0 && (
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <History color="primary" />
                            <Typography variant="h5" fontWeight="bold">
                                История модерации
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {moderationHistory.map((item) => (
                                <Box
                                    key={item.id}
                                    sx={{
                                        p: 2,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 1,
                                        backgroundColor: 'background.default'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {item.moderatorName}
                                        </Typography>
                                        <Typography variant="body2" fontWeight="bold" color="text.main">
                                            {formatDateTime(item.timestamp)}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mb: 1 }}>
                                        <Chip
                                            label={STATUS[item.action]}
                                            color={getStatusColor(item.action)}
                                            size="small"
                                            sx={{
                                                mb: 1,
                                                ...(item.action === 'requestChanges' && {
                                                    backgroundColor: '#ff9800',
                                                    color: 'rgba(0, 0, 0, 0.87)'
                                                })
                                            }}
                                        />
                                    </Box>

                                    {item.reason && (
                                        <Box sx={{ mb: 1 }}>
                                            <Typography variant="body2" fontWeight="bold" color="text.secondary">
                                                Причина:
                                            </Typography>
                                            <Typography variant="body2">
                                                {item.reason}
                                            </Typography>
                                        </Box>
                                    )}

                                    {item.comment && (
                                        <Box>
                                            <Typography variant="body2" fontWeight="bold" color="text.secondary">
                                                Комментарий модератора:
                                            </Typography>
                                            <Typography variant="body2">
                                                {item.comment}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                )}
            </Box>
        </Box>
    );
}
