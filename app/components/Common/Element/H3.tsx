import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

interface H3Props {
  [name: string]: any
}

const StyledH3 = styled.h3.withConfig<H3Props>({ shouldForwardProp })(
  compose(...basicStyledSystem)
)

export default StyledH3
