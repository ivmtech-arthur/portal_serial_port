import BasicButton from "./BasicButton"
import Block from 'components/Common/Element/Block'
import styled from "@emotion/styled"
import { CloudUpload } from '@mui/icons-material'
import get from 'lodash/get'
import { Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import StyledBody4 from "components/Common/Element/body4";
import general from "data/general";
import { useStore } from 'store'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});



function UploadButton(props) {
    const { id, name, placeHolder, onChange, variant, error, color, handleValidation, ...restProps } = props
    const [filename, setFilename] = useState("")
    const {
        state: {
            site: { lang },
        },
        dispatch
    } = useStore()
    const generalString = get(general, lang)
    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files[0]) {
            setFilename(e.target.files[0].name)
            if (onChange)
                onChange(e.target.files[0])
            if (handleValidation)
                handleValidation(e, "file")
        }

    }

    return (
        <Block>
            <Block className="flex items-center">
                <BasicButton component="label" color={color || 'primary'} variant={variant || "contained"} startIcon={<CloudUpload />}>
                    {/* {placeholderMap[`${key}Placeholder`]} */}
                    {props.children}
                    <VisuallyHiddenInput onChange={(e) => {
                        handleUpload(e)
                    }} type="file" id={id} name={name} />
                </BasicButton>
                {filename && <Block>{filename}</Block>}
                {!filename && <Block>{generalString.noFile}</Block>}
            </Block>
            {error && <Block display='flex'><i aria-hidden="true" className='error-icon' /><StyledBody4 color='errorRed'>{error}</StyledBody4></Block>}
        </Block>
    )
}

export default UploadButton