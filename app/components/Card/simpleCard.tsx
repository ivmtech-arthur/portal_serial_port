import Block from 'components/Common/Element/Block'
import StyledH5 from 'components/Common/Element/H5'
import StyledBody1 from 'components/Common/Element/body1'
import Image from 'next/image'

function SimpleCard(props) {
    const { title, desc, image } = props
    return (
        <Block className=" my-2 relative flex flex-col min-w-0 break-words bg-white bg-clip-border rounded-md border-solid border-[#333333] border-[1px] drop-shadow-xl">
            {image && (<Image src={image.src} width={image.width} height={image.height} />)}
            {title && <Block className="px-3 py-5 mb-0 ">
                <StyledH5>{title}</StyledH5>
            </Block>}
            {title && <Block className="flex-auto min-h-[1px] p-5">
                <StyledBody1>{desc}</StyledBody1>
            </Block>}
            <Block>
                {props.children}
            </Block>
        </Block>
    )
}

export default SimpleCard