import React from 'react';

type Size = 'small' | 'medium' | 'large';

export interface ButtonProps {
    size?: Size;
    text: string;
    backgroundColor?: string;
    textColor?: string;
    hoverBackgroundColor?: string;
    hoverTextColor?: string;
    iconRight?: React.ReactNode;
    iconLeft?: React.ReactNode;
    disabled?: boolean;
    onClick: () => void;
}
