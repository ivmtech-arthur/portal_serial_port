import Block from 'components/Common/Element/Block'
import styled, { css } from 'styled-components'
// import TextField

const Container = styled(Block)`
    ${(props) => props.errors && props.errors[props.childId] && css`
        {
            /* background-color: ivory; */
            /* border: none; */
            border: 2px solid red;
            
            /* border-radius: 5px;   */
            }
    `}
        box-sizing: border-box;
        
        /* Auto layout */
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 8px 6px 20px;
        gap: 16px;

        /* position: absolute; */
        height: 48px;
        left: 20px;
        top: 20px;

        /* Light grey 2 */
        background: #FAFAFA;

        border: 1px solid #959595;
        border-radius: 20px;
        width: 100%;
        /* width: 350px;
        @media (min-width: 620px) {
        width: 654px;
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
        background-image:url('/svg/icon_cancel.svg');
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

const StyledTextFieldSearch = (props) => {
    const { errors } = props
    let error = false
    // if(props.id)
    //     props.id = "id"
    const setError = (e) => {
        error = true
    }

const onChange = (e) => {
    if(props.onChange)
        props.onChange(e)
}

    return (
        <Block>
            <Container errors={errors} childId={props.id}>
                <i id='left-icon' aria-hidden="true" style={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></i>
                <input
                    id={props.id}
                    type="email"
                    name={props.name}
                    placeholder={props.placeholder}
                    onChange={(e) => {onChange(e)}}

                />
                {/* <input type="reset" value="Reset" ></input> */}

                <button style={{ border: 'none', background: 'none' }} onClick={(e) => {
                    const a = document.getElementById(props.id)
                    a.value = ""
                }}><i id="right-icon" aria-hidden="true" style={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} /></button>
            </Container>
            {/* {errors && errors[props.id] && <Block display='flex'><i aria-hidden="true" className='error-icon' /><Block color='errorRed'>{errors.email}</Block></Block>} */}
        </Block>

    )
}

export default StyledTextFieldSearch