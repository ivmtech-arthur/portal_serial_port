import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

const StyledBodyBold1 = styled.p.attrs({
    className: "bodyBold1",
}).withConfig({ shouldForwardProp })(
  compose(...basicStyledSystem)
)

export default StyledBodyBold1
