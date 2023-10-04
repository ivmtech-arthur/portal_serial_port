import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

const StyledBody4 = styled.p.attrs({
    className: "body4",
}).withConfig({ shouldForwardProp })(
  compose(...basicStyledSystem)
)

export default StyledBody4
