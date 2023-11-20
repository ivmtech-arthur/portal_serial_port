import Block from 'components/Common/Element/Block'
import get from 'lodash/get'
import { useStore } from 'store'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import general from 'data/general'
import { palletContent } from 'data/pallet'
import { withCookies } from 'react-cookie'
import StyledBody1 from 'components/Common/Element/body1'
import StyledH5 from 'components/Common/Element/H5'
import BasicButton from 'components/Button/BasicButton'
import BasicTextField from 'components/TextField/basicTextField'

const ConfirmCalibration = (props) => {
    const { cookies, isOpen, closePopup, proceedFunc, title, message, mode, popupData } = props
    const router = useRouter()
    const {
        state: {
            site: { lang },
        },
        dispatch
    } = useStore()
    const [deleted, setDeleted] = useState(false)
    const [open, setOpen] = useState(isOpen ? isOpen : false)
    const [weight, setWeight] = useState(0)

    const generalString = get(general, lang)
    const palletString = get(palletContent, lang)
    const handleCancel = () => {
        closePopup()
    }

    const handleClose = () => {
        closePopup()
    }

    return (
        <Block
            className="rounded-md bg-white bg-clip-padding md:"
        // width={{ md: '860px', _: '320px' }} height='450px' bg='white' borderRadius='32px'
        >
            <Block className="popupContainer" display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
                {/* <SvgIconLogout /> */}
                <StyledH5
                    className="items-start p-4 border-b-[1px] border-[#dee2e6]"
                // textAlign='center'
                // color='purple2'
                >{palletString.calibrationPopupTitle}</StyledH5>
                <StyledBody1
                    className="body1 text-center m-4 relative flex-auto p-4"
                >{palletString.calibrationPopupMessage + ` palletID: ${popupData[1]}`}</StyledBody1>
                <BasicTextField placeholder={palletString.calibrationPlaceholder} onChange={(e) => {
                    setWeight(parseFloat(e.target.value))
                }} />
                <Block className="flex flex-wrap items-center justify-end p-3 border-t-[1] border-[#dee2e6]">
                    <BasicButton className="mx-1" onClick={() => { handleCancel() }}>{generalString.cancel}</BasicButton>
                    <BasicButton color={mode == "delete" ? "error" : "primary"} className="mx-1" onClick={async () => {
                        const updatedData = {
                            ...popupData,
                            calibrationWeight: weight
                        }
                        await proceedFunc(updatedData);
                        closePopup()
                    }}>{generalString.confirm}</BasicButton>
                </Block>
            </Block>


        </Block>
    )


}

export default withCookies(ConfirmCalibration)
