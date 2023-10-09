
import Block from 'components/Common/Element/Block'
import LoginForm from '../../components/Form/Login'
import { useStore } from '/store'
import Image from 'next/image'
import FormHandler from '/components/Form'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import general from '../../data/general'
import Button7 from '../../components/Button/Button7'
import Popup from '../../components/Popup'
// import io from 'socket.io-client'
let socket
const Login = (props) => {
    const { handleOnSubmit, handleValidation, errors, fields } = props
    const [authStage, setAuthStage] = useState(0)
    const {
        state: {
            site: { lang },
            
        },
        dispatch,
    } = useStore()
    const generalString = get(general, lang)
    const sendEmail = () => {
        dispatch({
            type: 'showPopup',
            payload: {
                popup: true,
                popupType: 'messageEmailSent',
                isGlobal: false,
            },
        })
    }
    const [input, setInput] = useState('')
    useEffect(() => socketInitializer(), [])

  const socketInitializer = async () => {
    // console.log('socketInitializer')
    // const a = await fetch('/api/socketio');
    // socket = io()

    // socket.on('connect', () => {
    //   console.log('connected')
    // })

    // socket.on('update-input', msg => {
    //     setInput(msg)
    //   })
  }

  const onChangeHandler = (e) => {
    setInput(e.target.value)
    // socket.emit('input-change', e.target.value)
  }

    return (
        <Block  height='100vh' position='relative'>
            <Block display='flex' flexDirection={{ md: 'row', _: 'column' }} alignItems='center' justifyContent='space-around' position='absolute' top='50%' left='50%' transform="-50%, -50%"  className="containerNoMenu" width='100vw'>

                <Block width="359px" height="316px">
                    <Image src="/image/logo_main.png" width="359px" height="316px"/>
                </Block>

                <Block position='relative' width='600px' maxWidth='80%'>
                    {authStage == 0 && <FormHandler formType="Login"
                        parentCallback={{
                            forgetPassword: () => { setAuthStage(1) },
                        }} />}
                    {authStage == 1 && <FormHandler formType="ForgetPassword"
                        parentCallback={{
                            goBack: () => { setAuthStage(0) },
                            sendEmail: () => { sendEmail() }
                        }}

                    />}
                    {authStage == 2 && <FormHandler formType="ResetPassword"
                        parentCallback={{
                            toLogin: () => { setAuthStage(0) },
                        }} />}
                    <Button7 href="/" position='absolute' top='100%' left='50%' transform="-50%, -50%" width='max-content'>{generalString.tnc}</Button7>
                </Block>
                <input
      placeholder="Type something"
      value={input}
      onChange={onChangeHandler}
    />
            </Block>
            {/* <Button7 href="/"  position='absolute' top='80%' left='50%' transform="-50%, -50%" display={{ md: 'none', _: 'block' }}>{generalString.tnc}</Button7> */}
            <Popup type="local" propsToPopup={{ onClosePopupCallback: () => { setAuthStage(2) } }} />
        </Block >

    )
}

export default Login