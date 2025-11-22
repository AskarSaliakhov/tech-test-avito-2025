export interface MetricsDashboardProps {
    summary: {
        approvedPercentage: number,
        averageReviewTime: number,
        rejectedPercentage: number,
        requestChangesPercentage: number,
        totalReviewed: number,
        totalReviewedThisMonth: number,
        totalReviewedThisWeek: number,
        totalReviewedToday: number,
    }
}
