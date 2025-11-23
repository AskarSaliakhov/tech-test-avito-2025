export const filterStyles = {
    paper: {
        width: 300,
        p: 2,
        position: 'sticky',
        top: 16,
        alignSelf: 'flex-start',
        maxHeight: 'calc(100vh - 32px)',
        overflow: 'auto'
    },
    menuProps: {
        PaperProps: {
            style: {
                maxHeight: 200,
                width: 250,
            },
        },
    },
    chipsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0.5,
        maxHeight: '60px',
        overflow: 'auto',
        alignItems: 'flex-start',
    },
    chip: {
        fontSize: '0.75rem',
        height: '24px',
        maxWidth: '120px',
        '& .MuiChip-label': {
            padding: '0 8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        }
    },
    formControl: {
        '& .MuiOutlinedInput-root': {
            minHeight: '56px',
            alignItems: 'flex-start',
            paddingTop: '8px',
        }
    }
};
