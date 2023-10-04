import Block from '/components/Common/Element/Block'
import get from 'lodash/get'
import { useStore } from '/store'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import SvgIconTick from '/public/svg/icon_tick.svg'
import SvgIconLogout from '/public/svg/icon_logout.svg'
import general from '../../data/general'
import login from '../../data/auth/login'
import listproduct from '../../data/product/listproduct'
import StyledBodyBold1 from '../Common/Element/bodyBold1'
import StyledBody4 from '/components/Common/Element/body4'
import Button1 from '../Button/Button1'
import StyledH3 from '../Common/Element/H3'
import StyledBody2 from '../Common/Element/body2'
import { withCookies } from 'react-cookie'

const Logout = (props) => {
    const { cookies,isOpen, closePopup, } = props
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
    
    const handleLogout = () => {
        cookies.remove('userToken', { path: '/' })
        cookies.remove('role', { path: '/' })
        dispatch({ type: 'setAuthenticated', payload: { authenticated: false } })
        handleClose()
        router.push(`/${lang}/login`)
        
    }
   
    return (
        <Block  width={{ md: '860px', _: '320px' }} height='450px' bg='white'  borderRadius='32px'>
            <Block className="popupContainer" display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
                <SvgIconLogout />
                <StyledH3 textAlign='center' color='purple2'>{loginString.logoutTitle}</StyledH3>
            
                <Block display='flex'>
                    <Button1 px="5px" onClick={() => { handleCancel() }}>{generalString.cancel}</Button1>
                    <Button1 px="5px" onClick={() => { handleLogout() }}>{generalString.confirm}</Button1>
                </Block>
            </Block>


        </Block>
    )
    

}

export default withCookies(Logout)
