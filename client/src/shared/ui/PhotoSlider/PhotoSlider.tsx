import { useState } from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import type { PhotoSliderProps } from "./types.ts";

export function PhotoSlider({
                         photos,
                         height = 400,
                         width = '100%',
                         showThumbnails = true
                     }: PhotoSliderProps) {
    const [activeStep, setActiveStep] = useState(0);

    const maxSteps = photos.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
    };

    const handleStepClick = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Box
            sx={{
                maxWidth: 800,
                width: width,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    position: 'relative',
                    height: height,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    backgroundColor: 'grey.100',
                    borderRadius: 0
                }}
            >
                <Box
                    component="img"
                    src={photos[activeStep]}
                    alt={`Photo ${activeStep + 1}`}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />

                <IconButton
                    onClick={handleBack}
                    sx={{
                        position: 'absolute',
                        left: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.9)'
                        }
                    }}
                >
                    <KeyboardArrowLeft />
                </IconButton>

                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.9)'
                        }
                    }}
                >
                    <KeyboardArrowRight />
                </IconButton>
            </Paper>

            {showThumbnails && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        gap: 1,
                        marginTop: 1
                    }}
                >
                    {photos.map((photo, index) => (
                        <Box
                            key={index}
                            onClick={() => handleStepClick(index)}
                            sx={{
                                width: 60,
                                height: 60,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                opacity: index === activeStep ? 1 : 0.6,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Box
                                component="img"
                                src={photo}
                                alt={`Фото ${index + 1}`}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}

