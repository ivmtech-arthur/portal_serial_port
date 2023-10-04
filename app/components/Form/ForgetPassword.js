import Block from '/components/Common/Element/Block'
import StyledTextField from '../TextField/styledTextField'
import StyledTextFieldPassword from '../TextField/styledTextFieldPassword'
import StyledH2 from '/components/Common/Element/H2'
import Button1 from '../Button/Button1'
import Button2 from '../Button/Button2'
import Button7 from '../Button/Button7'
import CustomCheckBox from '../Button/CheckBox'
import forgetPassword from '../../data/auth/forgetPassword'
import general from '../../data/general'
import get from 'lodash/get'
import { useStore } from '/store'
import { useState } from 'react'
const ForgetPasswordForm = (props) => {
    const { handleOnSubmit, handleValidation, errors, parentCallback, fields } = props
    const {
        state: {
            site: { lang },
        },
    } = useStore()
    const generalString = get(general, lang)
    const forgetPasswordString = get(forgetPassword, lang)
    const [email,setEmail] = useState("")
    return (
        <Block display='flex' flexDirection='column' alignItems='center' justifyContent='space-around' px='180px' height='600px'>
            <StyledH2 color='purple2'>{forgetPasswordString.welcome}</StyledH2>
            <Block color='purple2'>{forgetPasswordString.desc}</Block>
            <StyledTextField onChange={(e) => {setEmail(e.target.value)}} placeholder={generalString.placeholderEmail} handleValidation={handleValidation} id="email" name="email" errors={errors} />
            <Block display='flex'>
                <Button1 px='5px' onClick={() => {
                    if (parentCallback.sendEmail)
                        parentCallback.sendEmail(email)
                }}>{generalString.confirm}</Button1>
                <Button2 px='5px' onClick={() => {
                    if (parentCallback.goBack)
                        parentCallback.goBack()
                }}>{generalString.back}</Button2>
            </Block>


        </Block>
    )
}

export default ForgetPasswordForm