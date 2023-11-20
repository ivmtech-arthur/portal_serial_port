import Block from 'components/Common/Element/Block'
import get from 'lodash/get'
import { useStore } from 'store'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import SvgIconTick from 'public/svg/icon_tick.svg'
import SvgIconLogout from 'public/svg/icon_logout.svg'
import general from 'data/general'
import login from 'data/auth/login'
// import listproduct from 'data/product/listproduct'
import StyledBodyBold1 from '../Common/Element/bodyBold1'
import StyledBody4 from 'components/Common/Element/body4'
import Button1 from '../Button/Button1'
import StyledH3 from '../Common/Element/H3'
import StyledBody2 from '../Common/Element/body2'
import { withCookies } from 'react-cookie'
import StyledBody1 from 'components/Common/Element/body1'
import StyledH5 from 'components/Common/Element/H5'
import BasicButton from 'components/Button/BasicButton'
import CustomTable from 'components/Table/table'

const ConfirmEndReplenishment = (props) => {
    const { cookies, isOpen, closePopup, proceedFunc, title, message, mode, popupData } = props
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
    const loginString = get(login, lang)
    const handleCancel = () => {
        closePopup()
    }

    const handleClose = () => {
        closePopup()
    }

    const column = popupData?.[0] ?
        Object.keys(popupData[0]).map((key) => {
            return {
                field: key,
                headerName: key,
                width: 90,
                flex: 1,
                // renderCell: () => {
                //     return (
                //         <TestCollapse />
                //     )
                // }
            };
        }) : []
    
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
                >{title}</StyledH5>
                <StyledBody1
                    className="body1 text-center m-4 relative flex-auto p-4"
                >{message}</StyledBody1>
                {popupData &&
                    <CustomTable
                        columns={column}
                        rows={popupData}
                    />}
                <Block className="flex flex-wrap items-center justify-end p-3 border-t-[1] border-[#dee2e6]">
                    {/* <BasicButton className="mx-1" onClick={() => { handleCancel() }}>{generalString.cancel}</BasicButton> */}
                    <BasicButton color={mode == "delete" ? "error" : "primary"} className="mx-1" onClick={async () => {
                        await proceedFunc(popupData);
                        closePopup()
                    }}>{generalString.confirm}</BasicButton>
                </Block>
            </Block>


        </Block>
    )


}

export default withCookies(ConfirmEndReplenishment)
