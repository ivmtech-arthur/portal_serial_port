import BasicButton from "./BasicButton"
import Block from 'components/Common/Element/Block'
import styled from "@emotion/styled"
import { CloudUpload } from '@mui/icons-material'
import get from 'lodash/get'
import { Button, ButtonPropsColorOverrides, ButtonPropsVariantOverrides } from "@mui/material";
import { ChangeEvent, useState } from "react";
import StyledBody4 from "components/Common/Element/body4";
import { OverridableStringUnion } from '@mui/types'
import general from "data/general";
import { useStore } from 'store'
import BasicChip from "components/chip"
import { ExtendFile } from "lib/helper"

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

type UploadButtonProps = {
    id?: string,
    name?: string,
    placeholder?: string,
    onChange?: (e, deleteIndex?) => void,
    variant?: OverridableStringUnion<"text" | "contained" | "outlined", ButtonPropsVariantOverrides>,
    error?: any,
    color?: OverridableStringUnion<"primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>,
    handleValidation?: (e, type?, action?) => void,
    multiple?: boolean,
    [name: string]: any
}

function UploadButton(props: UploadButtonProps) {
    const { id, name, placeholder, onChange, variant, error, color, handleValidation, multiple, usageMap, ...restProps } = props
    const [filenameList, setFilenameList] = useState([])
    const [fileIndex, setFileIndex] = useState(0)
    const {
        state: {
            site: { lang },
        },
        dispatch
    } = useStore()
    const generalString = get(general, lang)
    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files[fileIndex]) {
            setFilenameList([...filenameList, e.target.files[fileIndex].name])
            let custFile: ExtendFile = e.target.files[fileIndex]
            if (multiple) { 
                custFile.usage = usageMap[fileIndex]
            }
            if (onChange)
                onChange(custFile)
            if (handleValidation)
                handleValidation(e, multiple ? "fileMultiple" : "file")
            if (multiple) {
                let tempFileIndex = fileIndex
                setFileIndex(tempFileIndex++)
            }
        }

    }

    const fileNameListView = filenameList.map((filename, index) => {
        // return <Block>{filename}</Block>
        let label = ""
        if (multiple && usageMap) {
            label += usageMap[index] + ":";
        }
        label += filename
        return <BasicChip label={label} handleClose={(e) => {
            onChange(null, index)
            e.target.name = name
            handleValidation(e, multiple ? "fileMultiple" : "file", { action: "delete", index })
            filenameList.splice(index, 1)
            setFilenameList([...filenameList])
        }} />
    })

    return (
        <Block>
            <Block className="flex items-center">
                <BasicButton component="label" color={color || 'primary'} variant={variant || "contained"} startIcon={<CloudUpload />}>
                    {/* {placeholderMap[`${key}Placeholder`]} */}
                    {props.children}
                    <VisuallyHiddenInput onChange={(e) => {
                        handleUpload(e)
                    }} type="file" id={id} name={name} multiple={multiple} />
                </BasicButton>
                {fileNameListView}
                {filenameList.length == 0 && <Block>{generalString.noFile}</Block>}
            </Block>
            {error && <Block display='flex'><i aria-hidden="true" className='error-icon' /><StyledBody4 color='errorRed'>{error}</StyledBody4></Block>}
        </Block>
    )
}

export default UploadButton