import Block from 'components/Common/Element/Block'
import StyledBody4 from 'components/Common/Element/body4'
import styled, { css } from 'styled-components'
import { useState } from 'react'
// import TextField

const Container2 = styled(Block)`
    ${(props) => props.childprops && props.error && css`
        {
            /* background-color: ivory; */
            /* border: none; */
            border: 2px solid red;
            
            /* border-radius: 5px;   */
        },
    `, (props) =>  css`
            #right-icon{
                background-image: ${props.showPassword ? "url('/svg/icon_eyes_closed.svg')" : "url('/svg/eye.svg')"};
            /* background-image: url('/svg/eye.svg'); */
             {
                
            }
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
        height: 60px;
        left: 20px;
        top: 20px;

        /* Light grey 2 */
        background: #FAFAFA;

        border: 1px solid #959595;
        border-radius: 20px;
        width: 100%;
        /* width: 326px;
        @media (min-width: 620px) {
        width: 600px;
      } */
        /* pointer-events: none; */

    &:focus-within{
        border: 1px solid #333333;
        
        > i {
            background:url('/svg/Search_black.svg');
        }
        > input::placeholder{
            color: #333333;
        }
    }

    .error-msg {
        display: none;
    }

    input:invalid {
        
        /* & {
            background-color: ivory;
            border: none;
            outline: 2px solid red;
            border-radius: 5px;
        } */

        /* error-msg {
            background-color: red;
            display: flex;
        } */
    }


    #left-icon {
        left:0;
        padding:10px 10px;
        background-image:url('/svg/Search_grey.svg');
        /* color:#30A3F1; */
    }

    #right-icon {
        /* left:0;   */
        /* width: 20px;
        height: 20px; */
        padding:10px 20px;

        /* color:#30A3F1; */
    }

    input {
        width: 100%;
        height: 100%;
        border: none;
        background: #FAFAFA;
        /* pointer-events: auto; */
     }

    
`

// const Container2 = styled(Block)`

// `

const StyledTextFieldPassword = (props) => {
    const { error,id,...restProps } = props
    const [showPassword, setShowPassword] = useState(false)
    // if(props.id)
    //     props.id = "id"
    const setError = (e) => {
        error = true
    }

    function myFunction(e) {
        if(!props.id) return
        var x = document.getElementById(props.id)
        if (x.type === "password") {
            x.type = "text";
            setShowPassword(true)
        } else {
            x.type = "password";
            setShowPassword(false)
        }
        
    }
    return (
        <Block {...restProps} width='100%'>
            <Container2 error={error} childprops={{ id: props.id, type: "password" }} showPassword={showPassword}>
                {/* <i id='left-icon' aria-hidden="true" style={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></i> */}
                <input
                    id={props.id}
                    type="password"
                    name={props.name}
                    placeholder={props.placeholder}
                    onChange={(e) => {props.handleValidation(e)}}

                />
                {/* <input type="reset" value="Reset" ></input> */}

                <button style={{ border: 'none', background: 'none' }} onClick={(e) => {
                    myFunction(e)
                    // console.log("ONCLICK,", e, a.value)
                }}><i id="right-icon" aria-hidden="true" style={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} /></button>
            </Container2>
            {error && <Block display='flex'><i aria-hidden="true" className='error-icon' /><StyledBody4 color='errorRed'>{error}</StyledBody4></Block>}
        </Block>

    )
}

export default StyledTextFieldPassword