import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

const StyledH4 = styled.h4.withConfig({ shouldForwardProp })(
  compose(...basicStyledSystem)
)

export default StyledH4
