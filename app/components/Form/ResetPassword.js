import Block from 'components/Common/Element/Block'
import StyledTextField from '../TextField/styledTextField'
import StyledTextFieldPassword from '../TextField/styledTextFieldPassword'
import StyledH2 from 'components/Common/Element/H2'
import Button1 from '../Button/Button1'
import Button2 from '../Button/Button2'
import Button7 from '../Button/Button7'
import CustomCheckBox from '../Button/CheckBox'
import forgetPassword from '../../data/auth/forgetPassword'
import general from '../../data/general'
import get from 'lodash/get'
import { useStore } from '/store'
import { useState } from 'react'
const ResetPasswordForm = (props) => {
    const { handleOnSubmit, handleValidation, errors,email, parentCallback, fields } = props
    const {
        state: {
            site: { lang },
        },
    } = useStore()
    const generalString = get(general, lang)
    const forgetPasswordString = get(forgetPassword, lang)
    const [password,setPassword] = useState("")
    const [passwordConfirmation,setPasswordConfirmation] = useState("")
    return (
        <Block display='flex' flexDirection='column' alignItems='center' justifyContent='space-around' px='180px' height='600px'>
            <StyledH2 color='purple2'>{forgetPasswordString.resetTitle}</StyledH2>
            <Block color='purple2'>{forgetPasswordString.resetDesc}</Block>
            <StyledTextFieldPassword py="10px" onChange={(e) => {
                setPassword(e.target.value)
            }} placeholder={generalString.placeholderPassword} handleValidation={handleValidation} id="newPassword" name="newPassword" errors={errors} />
            <StyledTextFieldPassword py="10px" placeholder={generalString.placeholderPassword} handleValidation={handleValidation} id="confirmPassword" name="confirmPassword" errors={errors} />

            <Button1 px='5px' onClick={() => {
                if (parentCallback.toLogin)
                    parentCallback.toLogin(password)
            }}>{generalString.confirm}</Button1>


        </Block>
    )
}

export default ResetPasswordForm