import Block from 'components/Common/Element/Block'
import Image from 'next/image'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import ContactForm from './contactForm'
import StyledTextField from '../TextField/styledTextField'
import StyledTextFieldSearch from '../TextField/styledTextFieldSearch'
import StyledTextFieldPassword from '../TextField/styledTextFieldPassword'
import StyledTextSelectField from '../TextField/styledTextSelectField'
import StyledTextCalendar from '../TextField/styledTextCalendar'
import Button1 from '../Button/Button1'
import Button2 from '../Button/Button2'
import Button3 from '../Button/Button3'
import Button4 from '../Button/Button4'
import Button5 from '../Button/Button5'
import Button6 from '../Button/Button6'
import Button7 from '../Button/Button7'
import RadioGroup from '../Button/RadioGroup'
import CustomCheckBox from '../Button/CheckBox'
import ListTable from '../Table/table'
// import TextField

const Test = (props) => {
    const { handleOnSubmit, handleValidation, errors, fields } = props
    return (
        <Block>

            <Image src="/image/logo.jpg" width="359px" height="316px" />
            <Block>
                <form onSubmit={handleOnSubmit}>
                    <StyledTextField placeholder="test" handleValidation={handleValidation} name="username" id="name"></StyledTextField>
                    <input placeholder="test" onChange={handleValidation} name="username" />
                    <StyledTextFieldSearch placeholder="test2" handleValidation={handleValidation} id="email" name="email" errors={errors} />
                    <StyledTextFieldPassword placeholder="test3" handleValidation={handleValidation} id="password" name="password" />
                    <StyledTextSelectField id="select"/>
                    <StyledTextCalendar id="calander"/>
                    <button type='submit'>submit</button>
                    <Button1>test</Button1>
                    <Button2>test</Button2>
                    <Button3>test</Button3>
                    <Button4>test</Button4>
                    <Button5>test</Button5>
                    <Button6>test</Button6>
                    <Button7 href="/">test</Button7>
                    <RadioGroup></RadioGroup>
                    <CustomCheckBox></CustomCheckBox>
                    <ListTable/>
                </form>

            </Block>
            {/* <ContactForm/> */}
        </Block>
    )
}

export default Test