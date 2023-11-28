import { useState } from 'react'
import Switch, { SwitchPropsColorOverrides } from '@mui/material/Switch';
import { OverridableStringUnion } from '@mui/types'
import { FormControlLabel } from '@mui/material';

type BasicSwitchProps = {
    value?: boolean,
    onChange?: (e) => void,
    color?: OverridableStringUnion<"primary" | "secondary" | "error" | "info" | "success" | "warning" | "default", SwitchPropsColorOverrides>,
    label?: string,
    disabled?: boolean
}

export default function BasicSwitch(props: BasicSwitchProps) {
    const { value, onChange, color, label, disabled } = props
    const [checked, setChecked] = useState(value);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (onChange) {
            onChange(event)
        }
    };

    return (
        <FormControlLabel
            control={<Switch
                disabled={disabled}
                color={color || "primary"}
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />}
            label={label}
        />
    );
}