import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import type { ButtonProps } from './types.ts'

export function CustomButton(props: ButtonProps) {
    const {
        text,
        size = 'medium',
        iconRight,
        iconLeft,
        backgroundColor,
        textColor,
        hoverBackgroundColor,
        hoverTextColor,
        onClick,
        disabled,
        ...otherProps
    } = props;

    const buttonStyles = {
        display: "flex",
        alignItems: "center",
        gap: 1,
        backgroundColor,
        size,
        color: textColor,
        ...(hoverBackgroundColor || hoverTextColor) && {
            '&:hover': {
                ...(hoverBackgroundColor && { backgroundColor: hoverBackgroundColor }),
                ...(hoverTextColor && { color: hoverTextColor }),
            },
        },
    };

    return (
        <Button
            sx={buttonStyles}
            {...otherProps}
            onClick={onClick}
            disabled={disabled}
        >
            {iconLeft && (
                <Box component="span" sx={{ display: "flex", color: "inherit" }}>
                    {iconLeft}
                </Box>
            )}
            {text}
            {iconRight && (
                <Box component="span" sx={{ display: "flex", color: "inherit" }}>
                    {iconRight}
                </Box>
            )}
        </Button>
    );
}
