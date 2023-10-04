import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

const StyledH5 = styled.h5.withConfig({ shouldForwardProp })(
  compose(...basicStyledSystem)
)

export default StyledH5
