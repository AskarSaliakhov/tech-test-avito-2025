import { BarChartPro } from '@mui/x-charts-pro/BarChartPro';
import type { ColumnCharacterisationChartProps } from "./types.ts";
import { formatDateFromDash } from "../../utils/dates/dates.ts"

export function ColumnCharacterisationChart({ columns }: ColumnCharacterisationChartProps) {
    const series = [
        {
            label: 'Одобрено',
            data: columns.map((column) => column.approved),
        },
        {
            label: 'Отклонено',
            data: columns.map((column) => column.rejected),
        },
        {
            label: 'Отправлено на доработку',
            data: columns.map((column) => column.requestChanges),
        },
    ];

    return (
        <BarChartPro
            height={300}
            xAxis={[{
                data: columns.map((column) => formatDateFromDash(column.date)),
                zoom: true
            }]}
            yAxis={[{
                tickMinStep: 1
            }]}
            series={series}
            colors={['#4CAF50', '#F44336', '#FFC107']}
        />
    );
}
