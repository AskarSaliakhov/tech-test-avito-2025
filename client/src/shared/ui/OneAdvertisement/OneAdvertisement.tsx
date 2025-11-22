import { Box, Typography, Chip, Card, CardContent } from '@mui/material';
import { Category, AccessTime } from '@mui/icons-material';

import { getPriorityIcon, getStatusIcon } from "./utils.tsx";
import type { OneAdvertisementProps } from "./types.ts";

export const OneAdvertisement = ({
                                     image,
                                     title,
                                     price,
                                     category,
                                     status,
                                     priority,
                                     createdAt,
                                 }: OneAdvertisementProps ) => {

    return (
        <Card sx={{ display: 'flex', p: 2, gap: 2 }}>
            <Box
                component="img"
                src={image}
                alt={title}
                sx={{
                    width: 150,
                    height: 150,
                    objectFit: 'cover',
                    borderRadius: 1
                }}
            />

            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                p: 0,
                '&:last-child': { pb: 0 }
            }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                        {price}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Category fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            {category}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTime fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            {createdAt}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                            icon={getStatusIcon(status)}
                            label={status}
                            color={
                                status === 'approved' ? 'success' : status === 'rejected' ? 'error' : 'warning'
                            }
                            size="small"
                        />
                        <Chip
                            icon={getPriorityIcon(priority)}
                            label={priority}
                            color={priority === 'urgent' ? 'error' : 'primary'}
                            variant="outlined"
                            size="small"
                        />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};
