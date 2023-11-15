import Block from 'components/Common/Element/Block'
import get from 'lodash/get'
import { useStore } from 'store'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import general from 'data/general'
import { withCookies } from 'react-cookie'
import StyledBody1 from 'components/Common/Element/body1'
import StyledH5 from 'components/Common/Element/H5'
import BasicButton from 'components/Button/BasicButton'
import CustomTable3 from 'components/Table/newTable'
import CustomTable from 'components/Table/table'
import { palletContent } from 'data/pallet'

const ConfirmEndReplenishment = (props) => {
    const { cookies, isOpen, closePopup, proceedFunc, mode } = props
    console.log("ConfConfirmReplenishmentirmProceed", props)
    const router = useRouter()
    const {
        state: {
            site: { lang },
        },
        dispatch
    } = useStore()
    const [deleted, setDeleted] = useState(false)

    const [open, setOpen] = useState(isOpen ? isOpen : false)

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
        >
            <Block className="popupContainer" display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
                <StyledH5
                    className="items-start p-4 border-b-[1px] border-[#dee2e6]"
                >{palletString.replenishmentPopupTitle}</StyledH5>
                <StyledBody1
                    className="body1 text-center m-4 relative flex-auto p-4"
                >{palletString.startReplenishmentPopupMessage}</StyledBody1>
            </Block>


        </Block>
    )


}

export default withCookies(ConfirmEndReplenishment)
