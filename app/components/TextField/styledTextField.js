
import Block from '/components/Common/Element/Block'
import StyledBody4 from '/components/Common/Element/body4'
import styled,{css} from 'styled-components'

const InputField = styled.input`
    ${(props) => props.hover && css`
        &:hover{
            border-color: white;
            background: white;
        },
    `}
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px 8px 6px 20px;
    gap: 16px;

    /* position: absolute; */
    /* @media (min-width: 620px) {
        width: 600px;
      } */
   
    width: 100%;
    height: 60px;
    left: 20px;
    top: 20px;

    /* Light grey 2 */
    background: #FAFAFA;
    /* Mid Grey */

    border: 1px solid #959595;
    border-radius: 20px;
    /* &:hover{
        border-color: yellow;
    }     */

    /* ::placeholder{position:absolute;left:5px;top:5px;z-index:1;color:#ccc;}
    .form-group label::after{content:"*";color:red;}
    input[required]:valid + label{display: none;} */
    &::placeholder::after{content:"*";color:red;}
    input[required]:valid + label{display: none;} */
    &:focus{
        border: 1px solid #333333;
        
        ::placeholder{
            color: #333333;
        }
    }

    
    
`

const StyledTextField = (props) => {
    const { id,handleValidation, error,onClick,onChange,name,placeholder,value,type,hover,enableEdit,required, ...restProps } = props
    const onClickEvent = (e) => {
        if(onClick) onClick(e)
    }

    return (
        <Block {...restProps} maxWidth='100%' width='100%'>
            <InputField
                name={name}
                placeholder={placeholder}
                onChange={(e) => {
                 if(handleValidation) 
                    handleValidation(e) 
                if(onChange)
                    onChange(e)
                }}
                value={value}
                // readOnly={value && !enableEdit}
                type={type}
                onClick={onClickEvent}
                hover={hover}
                focus
                required={required}
            />
            {error && <Block display='flex'><i aria-hidden="true" className='error-icon' /><StyledBody4 color='errorRed'>{error}</StyledBody4></Block>}
        </Block>

    )
}

// const InputField = styled.input`
// box-sizing: border-box;

// /* Auto layout */

// display: flex;
// flex-direction: row;
// align-items: center;
// padding: 6px 8px 6px 20px;
// gap: 16px;

// /* position: absolute; */
// width: 654px;
// height: 48px;
// left: 20px;
// top: 20px;

// /* Light grey 2 */
// background: #FAFAFA;
// /* Mid Grey */

// border: 1px solid #959595;
// border-radius: 20px;
// /* &:hover{
//     border-color: yellow;
// }     */

// &:focus{
//     border: 1px solid #333333;

//     ::placeholder{
//         color: #333333;
//     }
// }
// `
// export default InputField
export default StyledTextField