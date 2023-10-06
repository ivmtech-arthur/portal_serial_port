import Block from 'components/Common/Element/Block'
import styled from 'styled-components'
import Link from 'next/link'
import React from 'react'

const CustBlock = styled.button`
    background-color: white;
    border: none;
    color: grey;
    font-family: 'Inter';
    &:hover{
        color: black;
    }
`
const Button7 = (props) => {
    const { onClick, ...restProps } = props
    return (
        <Block {...restProps}>
            <Link href={props.href}>
                <CustBlock><a>{props.children}</a></CustBlock>
            </Link>
        </Block>

    )
}

export default Button7