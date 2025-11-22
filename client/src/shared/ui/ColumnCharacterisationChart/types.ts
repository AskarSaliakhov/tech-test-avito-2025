interface ColumnCharacterisationChart {
    approved: number;
    rejected: number;
    requestChanges: number;
    date: string
}

export interface ColumnCharacterisationChartProps {
    columns: ColumnCharacterisationChart[];
}
