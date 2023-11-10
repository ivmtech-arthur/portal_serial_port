import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

const StyledBody3 = styled.p.attrs({
    className: "body3",
}).withConfig({ shouldForwardProp })(
  compose(...basicStyledSystem)
)

export default StyledBody3
