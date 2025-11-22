import { useDecisions, useActivity, useCategories, useSummary } from "../../store/api/statistics/statisticsApi.ts";
import { Loader } from '../../shared/ui/Loader/Loader.tsx'
import { CircularChart } from "../../shared/ui/СircularChart/CircularChart.tsx";
import { ColumnChart } from "../../shared/ui/ColumnChart/ColumnChart.tsx";
import { ColumnCharacterisationChart } from "../../shared/ui/ColumnCharacterisationChart/ColumnCharacterisationChart.tsx";
import { MetricsDashboard } from "../../widgets/ui/MetricsDashboard/MetricsDashboard.tsx";
import { Box, Typography, Paper } from '@mui/material';
import { ErrorCard } from "../../shared/ui/ErrorCard/ErrorCard.tsx";

export function StatisticsPage() {
    const { data: decisions, error: decisionError, isLoading: isLoadingDecisions } = useDecisions();
    const { data: activity, error: activityError, isLoading: isLoadingActivity } = useActivity();
    const { data: categories, error: categoriesError, isLoading: isLoadingCategories } = useCategories();
    const { data: summary, error: summaryError, isLoading: isLoadingSummary } = useSummary();

    const isLoading = isLoadingDecisions || isLoadingActivity || isLoadingCategories || isLoadingSummary;

    if (isLoading) return <Loader />;

    return (
        <Box>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    mb: 4,
                    fontWeight: 600,
                    color: 'primary.main'
                }}
            >
                Статистика
            </Typography>

            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    mb: 3
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        mb: 3
                    }}
                >
                    Общая статистика
                </Typography>
                {summaryError ? <ErrorCard /> : <MetricsDashboard summary={summary} />}
            </Paper>

            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    mb: 3
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        mb: 3
                    }}
                >
                    График активности по дням за последнюю неделю
                </Typography>
                {activityError ? <ErrorCard /> : <ColumnCharacterisationChart columns={activity} />}
            </Paper>

            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    mb: 3
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        mb: 3
                    }}
                >
                    Круговая диаграмма распределения решений
                </Typography>
                {decisionError ? <ErrorCard /> : <CircularChart decisions={decisions} />}
            </Paper>

            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    borderRadius: 2
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        mb: 3
                    }}
                >
                    График по категориям проверенных объявлений
                </Typography>
                {categoriesError ? <ErrorCard /> : <ColumnChart categories={categories} />}
            </Paper>
        </Box>
    );
}
