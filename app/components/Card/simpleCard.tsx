import Block from 'components/Common/Element/Block'
import StyledH5 from 'components/Common/Element/H5'
import StyledBody1 from 'components/Common/Element/body1'
import Image from 'next/image'

function SimpleCard(props) {
    const { title, desc, image, children } = props
    return (
        <Block className="relative flex flex-col min-w-0 break-words bg-white bg-clip-border rounded-md">
            {image && (<Image src={image.src} width={image.width} height={image.height} />)}
            <Block className="px-3 py-5 mb-0 ">
                <StyledH5>{ title}</StyledH5>
            </Block>
            <Block className="flex-auto min-h-[1px] p-5">
                <StyledBody1>{ desc}</StyledBody1>
            </Block>
            <Block>
                {children}
            </Block>
        </Block>
    )
}

export default SimpleCard