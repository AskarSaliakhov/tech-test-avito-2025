import { formatTimeSeconds } from "../../../shared/utils/dates/dates.ts";
import type { MetricsDashboardProps } from "./types.ts";
import { roundTwoNumber } from "../../../shared/utils/roundTwoNumber.ts";

export const CARDS_CONFIG = (metricsData: MetricsDashboardProps) => {
    const {
        totalReviewedToday,
        totalReviewedThisWeek,
        totalReviewedThisMonth,
        approvedPercentage,
        rejectedPercentage,
        averageReviewTime
    } = metricsData.summary;

    return [
        {
            title: 'Проверено сегодня',
            value: totalReviewedToday,
            period: 'За сегодня',
            color: 'primary.main',
            comparison: `За неделю: ${totalReviewedThisWeek}`
        },
        {
            title: 'Проверено за неделю',
            value: totalReviewedThisWeek,
            period: 'За 7 дней',
            color: 'primary.main',
            comparison: `За месяц: ${totalReviewedThisMonth}`
        },
        {
            title: 'Проверено за месяц',
            value: totalReviewedThisMonth,
            period: 'За месяц',
            color: 'primary.main',
            comparison: 'Все периоды'
        },
        {
            title: 'Процент одобренных',
            value: `${roundTwoNumber(approvedPercentage)}%`,
            period: 'Успешные проверки',
            color: 'success.main',
            comparison: `Отклонено: ${rejectedPercentage}%`
        },
        {
            title: 'Процент отклоненных',
            value: `${roundTwoNumber(rejectedPercentage)}%`,
            period: 'Не прошли проверку',
            color: 'error.main',
            comparison: `Одобрено: ${approvedPercentage}%`
        },
        {
            title: 'Среднее время проверки',
            value: formatTimeSeconds(averageReviewTime),
            period: 'На одно объявление',
            color: 'primary.main',
            comparison: 'мин:сек'
        }
    ];
};
