import { styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

export const MetricCard = styled(Card)(({ theme }) => ({
    height: '175px',
    width: '250px',
    boxShadow: theme.shadows[2],
    borderRadius: theme.spacing(1.5),
    border: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        boxShadow: theme.shadows[6],
        transform: 'translateY(-2px)',
    },
}));

export const MainValue = styled(Typography)(({ theme }) => ({
    fontSize: '2.2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(0.5),
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
}));

export const PeriodText = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
}));

export const ComparisonText = styled(Typography)(({ theme }) => ({
    fontSize: '0.7rem',
    color: theme.palette.text.disabled,
    marginTop: theme.spacing(0.5),
}));
