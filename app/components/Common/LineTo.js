import dynamic from 'next/dynamic'

const LineTo = dynamic(() => import('react-lineto'),{
    loading: () => 'Loading...',
    ssr: false,
})

const LineToWidget = (props) => {
    const { from, to } = props
    return (
        <>
            <div>{from} to {to}</div>
            <LineTo from={from} to={to} borderColor="blue" zIndex={1} />
        </>
    )
}

export default LineToWidget