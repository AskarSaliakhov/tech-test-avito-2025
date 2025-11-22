import { PieChart, type PieChartProps } from '@mui/x-charts/PieChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';
import { roundTwoNumber } from "../../utils/roundTwoNumber.ts";

import type { CircularChartProps } from "./types.ts";

const otherProps: Partial<PieChartProps> = {
    width: 200,
    height: 200,
    sx: {
        [`.${legendClasses.root}`]: {
            transform: 'translate(20px, 0)',
        },
    },
};

export function CircularChart({ decisions }: CircularChartProps) {

    const chartData = [
        {status: 'Одобрено', value: decisions.approved, color: '#4CAF50'},
        {status: 'Отклонено', value: decisions.rejected, color: '#F44336'},
        {status: 'На доработку', value: decisions.requestChanges, color: '#FFC107'},
    ]

    return (
        <PieChart
            series={[
                {
                    data: chartData.map((chart) => ({
                        label: chart.status,
                        value: chart.value,
                        color: chart.color
                    })),
                    valueFormatter: (v) => {
                        return `${roundTwoNumber(v.value)} % `;
                    },
                },
            ]}
            colors={chartData.map(item => item.color)}
            {...otherProps}
        />
    );
}
