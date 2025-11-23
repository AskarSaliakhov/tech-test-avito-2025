import React, { memo } from 'react';
import {
    TextField,
    InputAdornment,
    IconButton,
    type TextFieldProps,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import type { InputProps  } from "./types.ts";

export const Input = memo(function Input({
                                             value,
                                             onChange,
                                             placeholder = '',
                                             isExistSearchIcon = false,
                                             isExistsClearIcon = false,
                                             ...restProps
                                         }: InputProps & Omit<TextFieldProps, 'onChange'>) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const handleClear = () => {
        onChange('');
    };

    return (
        <TextField
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            InputProps={{
                startAdornment: isExistSearchIcon ? (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ) : undefined,
                endAdornment: isExistsClearIcon && value ? (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Очистить поле"
                            onClick={handleClear}
                            edge="end"
                            size="small"
                        >
                            <ClearIcon />
                        </IconButton>
                    </InputAdornment>
                ) : undefined,
            }}
            variant="outlined"
            fullWidth
            {...restProps}
        />
    );
});
