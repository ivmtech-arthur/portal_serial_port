import styled from 'styled-components'

const Hr = (props) => {
  const color = props.color ?? '#1e1e1e'

  return (
    <hr style={{
      border: `0.5px solid ${color}`,
      opacity: 0.1
    }} />
  )
}

export default Hr
