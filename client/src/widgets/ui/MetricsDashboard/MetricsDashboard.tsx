import { CardContent, Box, Grid } from '@mui/material';
import { MetricCard, MainValue, CardTitle, PeriodText } from  './consts.ts';
import { CARDS_CONFIG } from "./utils.ts";
import type { MetricsDashboardProps } from "./types";

export function MetricsDashboard(summary : MetricsDashboardProps) {
    const cards = CARDS_CONFIG(summary);

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <MetricCard>
                            <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardTitle>{card.title}</CardTitle>
                                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <MainValue sx={{ color: card.color }}>
                                        {card.value}
                                    </MainValue>
                                    <PeriodText>{card.period}</PeriodText>
                                </Box>
                            </CardContent>
                        </MetricCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
