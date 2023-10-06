import Block from 'components/Common/Element/Block'
import StyledTextField from '../TextField/styledTextField'
import StyledTextFieldPassword from '../TextField/styledTextFieldPassword'
import { withCookies } from 'react-cookie'
import StyledH2 from 'components/Common/Element/H2'
import Button1 from '../Button/Button1'
import Button4 from '../Button/Button4'
import Button7 from '../Button/Button7'
import CustomCheckBox from '../Button/CheckBox'
import login from '../../data/auth/login'
import general from '../../data/general'
import get from 'lodash/get'
import { useStore } from 'store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import getConfig from 'next/config'
import axios from 'axios'
import { useState } from 'react'
import { authService } from 'pages/api/api/auth/service'
const { publicRuntimeConfig } = getConfig()
const { API_URL, APP_URL } = publicRuntimeConfig

const initFields = {
  password: '',
  email: '',
  rememberMe: false,
}

const LoginForm = (props) => {
  const { getInitFields, handleOnSubmit, handleValidation, errors, handleError, parentCallback, fields, cookies } = props
  const {
    state: {
      site: { lang },
    },
    dispatch
  } = useStore()
  const router = useRouter()
  const generalString = get(general, lang)
  const loginString = get(login, lang)
  const [value,setValue] = useState(fields.email)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleOnSubmit) {
      handleOnSubmit(e, handleLogin)
    }
  }

  const handleLogin = () => {

    if (Object.keys(errors).length == 0) {
    } else {
    }
    axios.post(`${API_URL}/api/auth/local`, {
      identifier: fields.email,
      password: fields.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      const { data } = res
      if (data) {
        const useType = get(data, 'user.userType')
        const id = get(data, 'user.id')
        let opt = {
          path: '/',
          domain: '',
        }

        if(fields.rememberMe)
          opt.maxAge = 360000

        cookies.set('userToken', get(data, 'jwt', false), opt)

        cookies.set('role', useType, opt)


        dispatch({
          type: 'setAuthenticated',
          payload: { authenticated: true },
        })
        dispatch({
          type: 'setUserProfile',
          payload: { profile: get(data, 'user') },
        })
        dispatch({
          type: 'setRole',
          payload: { role: useType },
        })

        if (useType == 'Doctor')
          router.push(`/${lang}/pallet-config`)
        else
          router.push(`/${lang}/pallet-config/${id}`)
        // router.push('users')
      } else {
        // dispatch({ type: 'showAlert', payload: { alertType: 'error', message: `${data['message_name']} ${data['message']['zh']}` } })
      }
    }).catch((err) => {
      handleError({ password: loginString.error }, fields)
    })
  }

  useEffect(() => {
    if (getInitFields)
      getInitFields(initFields)
  }, [])
  return (
    // <form>
    <Block display='flex' flexDirection='column' alignItems='center' height='600px' width='100%'>
      <StyledH2 color='purple2'>{loginString.welcome}</StyledH2>
      <StyledTextField py="10px" placeholder={generalString.placeholderEmail} handleValidation={handleValidation} type="email" id="email" name="email" error={errors['email']} value={value}/>
      <StyledTextFieldPassword py="10px" placeholder={generalString.placeholderPassword} handleValidation={handleValidation} id="password" name="password" error={errors['password']} />
      <CustomCheckBox alignSelf="start" label={loginString.rememberMe} handleValidation={handleValidation} onClick={(isChecked) => { }} name="rememberMe" />
      <Button1 py='30px' onClick={
        (e) => {
          // router.push(`/${lang}/`)
          handleSubmit(e)
        }}>{generalString.confirm}</Button1>
      <Button4 py='30px'
        onClick={
          () => {
            if (parentCallback.forgetPassword) {
              parentCallback.forgetPassword()
            }
          }}>{loginString.forgotPassword}</Button4>
    </Block>
    // </form>
  )
}

export default withCookies(LoginForm)