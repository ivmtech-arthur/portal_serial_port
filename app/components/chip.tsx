import { Chip } from "@mui/material";

type ChipProps = {
    label?: string,
    handleClose?: (e) => void,
    handleClick?: (e) => void,
}

function BasicChip(props: ChipProps) {
    const { handleClose, handleClick, label } = props

    return (
        <Chip
            label={label}
            {
            ...(handleClose && {
                onDelete: (e) => {
                    handleClose(e)
                }
            })
            }
            {
            ...(handleClick && {
                onClick: (e) => {
                    handleClick(e)
                }
            })
            }
        />
    )
}

export default BasicChip