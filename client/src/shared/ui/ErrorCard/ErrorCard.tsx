import { Alert, AlertTitle, Box } from '@mui/material';

export function ErrorCard() {
    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', marginTop: 4 }}>
            <Alert severity="error">
                <AlertTitle>Ошибка</AlertTitle>
                Произошла ошибка. Попробуйте перезагрузить страницу
            </Alert>
        </Box>
    );
}
