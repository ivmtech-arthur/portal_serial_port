import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

const StyledBodyLight1 = styled.p.attrs({
    className: "bodyLight1",
}).withConfig({ shouldForwardProp })(
  compose(...basicStyledSystem)
)

export default StyledBodyLight1
