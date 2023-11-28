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
import { Prisma } from '@prisma/client'
import Cookies from 'js-cookie'
import BasicButton from 'components/Button/BasicButton'
import BasicTextField from 'components/TextField/basicTextField'
const { publicRuntimeConfig } = getConfig()
const { API_URL, APP_URL } = publicRuntimeConfig

const initFields = {
  password: '',
  name: '',
  rememberMe: false,
}

const LoginForm = (props) => {
  const { getInitFields, handleOnSubmit, handleValidation, errors, handleError, parentCallback, fields } = props
  // const { cookies }: { cookies: Cookies } = props
  const {
    state: {
      site: { lang },
    },
    dispatch
  } = useStore()
  const router = useRouter()
  const generalString = get(general, lang)
  const loginString = get(login, lang)
  const [value, setValue] = useState(fields.name)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleOnSubmit) {
      handleOnSubmit(e, handleLogin)
    }
  }

  const handleLogin = () => {
    console.log("handleLogin", props)
    if (Object.keys(errors).length == 0) {
    } else {
    }
    axios.post(`/api/auth/local`, {
      identifier: fields.name,
      password: fields.password,
      rememberMe: fields.rememberMe,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      const { data } = res
      console.log("res is", res)
      if (data) {
        let result = data.result
        const userType = get(result, 'user.userType.userTypeName')
        const userRole = get(result, 'user.userRole.userRoleName')
        const id = get(result, 'user.userID')
        let opt = {
          path: '/',
          domain: '',
          maxAge: 0,
        }

        if (fields.rememberMe)
          opt.maxAge = 360000

        // cookies.set('refreshToken', get(data, 'jwt', false), opt)
        // cookies.set('role', useType, opt)
        // Cookies.set('accessToken',get(result,'accessToken',false),opt)
        // Cookies.set('refreshToken', get(result, 'jwt', false), opt)
        // Cookies.set('userRole', userRole, opt)
        // Cookies.set('userType', userType, opt)
        // Cookies.
        // cookies.set('refreshToken', "test", opt)

        // cookies.set('role', "xd", opt)
        // console.log("handleLogin cookies", props, Object.keys(cookies), cookies)

        dispatch({
          type: 'setAuthenticated',
          payload: { authenticated: true },
        })
        dispatch({
          type: 'setUserProfile',
          payload: { profile: get(result, 'user') },
        })
        dispatch({
          type: 'setRole',
          payload: { role: userRole },
        })
        router.push(`/${lang}/machine-management`)
        // if (useType == 'Doctor')
        //   router.push(`/${lang}/pallet-config`)
        // else
        //   router.push(`/${lang}/pallet-config/${id}`)
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
    <Block display='flex' flexDirection='column' alignItems='center'  width='100%'>
      <StyledH2 color='black'>{loginString.welcome}</StyledH2>
      <BasicTextField className="my-3" placeholder={generalString.placeholderName} handleValidation={handleValidation} id="name" name="name" error={errors['name']} value={value} />
      {/* <StyledTextField py="10px" placeholder={generalString.placeholdername} handleValidation={handleValidation} type="name" id="name" name="name" error={errors['name']} value={value} /> */}
      <BasicTextField className="my-3" placeholder={generalString.placeholderPassword} handleValidation={handleValidation} id="password" name="password" error={errors['password']} type={'password'} />
      <CustomCheckBox alignSelf="start" label={loginString.rememberMe} handleValidation={handleValidation} onClick={(isChecked) => { }} name="rememberMe" />

      <BasicButton className="my-7" onClick={
        (e) => {
          // router.push(`/${lang}/`)
          handleSubmit(e)
        }}>{generalString.confirm}</BasicButton>
      <BasicButton py='30px'
        onClick={
          () => {
            if (parentCallback.forgetPassword) {
              parentCallback.forgetPassword()
            }
          }}>{loginString.forgotPassword}</BasicButton>
    </Block>
  )
}

export default withCookies(LoginForm)