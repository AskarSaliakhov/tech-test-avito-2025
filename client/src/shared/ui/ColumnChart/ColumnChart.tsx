import { BarChart } from '@mui/x-charts/BarChart';

interface ColumnChartProps {
    categories: Record<string, number>;
}

export function ColumnChart({ categories }: ColumnChartProps) {
    const labels = Object.keys(categories);
    const values = Object.values(categories);

    return (
        <BarChart
            height={300}
            colors={['#1976d2']}
            xAxis={[{
                data: labels,
                scaleType: 'band'
            }]}
            series={[
                {
                    data: values,
                },
            ]}
        />
    );
}
