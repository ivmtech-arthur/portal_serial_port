import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

const StyledH3 = styled.h3.withConfig({ shouldForwardProp })(
  compose(...basicStyledSystem)
)

export default StyledH3
