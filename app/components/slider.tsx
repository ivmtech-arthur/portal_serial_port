import { useState } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { Typography } from '@mui/material';
import BasicTextField from './TextField/basicTextField';

type BasicSliderProps = {
    startIcon?: JSX.Element,
    endIcon?: JSX.Element,
    value?: number,
    onChange?: (e, any?) => void,
    name?: string,
    disabled?: boolean
}

function BasicSlider(props: BasicSliderProps) {
    const { startIcon, endIcon, value, onChange, name, disabled } = props
    const [currentValue, setCurrentValue] = useState<number>(value || 0);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    const handleBlur = () => {
        if (currentValue < 0) {
            setCurrentValue(0);
        } else if (currentValue > 100) {
            setCurrentValue(100);
        }
    };
    return (
        <Box>
            <Typography id="input-slider" gutterBottom>
                {name}
            </Typography>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                {/* <VolumeDown /> */}
                {startIcon && startIcon}
                <Slider aria-label="Volume"
                    disabled={disabled}
                    value={currentValue} onChange={(e, newValue) => {
                    setCurrentValue(newValue as number)
                    if (onChange) {
                        onChange(e, newValue)
                    }
                }} />
                <BasicTextField
                    disabled={disabled}
                    value={`${currentValue}`}
                    size="small"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
                {/* <VolumeUp /> */}
                {endIcon && endIcon}
            </Stack>
        </Box>

    )
}

export default BasicSlider