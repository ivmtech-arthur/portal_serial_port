
import Block from 'components/Common/Element/Block'
import StyledBody4 from 'components/Common/Element/body4'
import styled, { css } from 'styled-components'

const InputField = styled.input`
   
    /* box-sizing: border-box; */

    /* Auto layout */

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px 8px 6px 20px;
    /* position: absolute; */
    /* @media (min-width: 620px) {
        width: 600px;
      } */
   
    width: 100%;
    height: 20px;
    left: 20px;
    top: 20px;

    /* Light grey 2 */
    background: white;
    /* Mid Grey */
    /* border: none;
    border-radius: 16px; */
    /* &:hover{
        border-color: yellow;
    }     */

    &:focus{
        
        ::placeholder{
            color: #333333;
        }
    }

    
    
`

const StyledSelectOption = (props) => {
    const { id, handleValidation, error, onClick, name, placeholder, value, type, hover, ...restProps } = props
    const onClickEvent = (e) => {
        if (onClick) onClick(e)
    }
    return (
        <Block {...restProps} maxWidth='100%' width='100%' className="border-red">
            <InputField
                name={name}
                placeholder={placeholder}
                onChange={(e) => {
                    if (handleValidation) handleValidation(e)
                }}
                value={value}
                readOnly={value}
                type={type}
                onClick={onClickEvent}
               // hover={hover}
                //focus
            />
        </Block>

    )
}

export default StyledSelectOption