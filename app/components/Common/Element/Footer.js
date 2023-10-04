import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

const StyledFooter = styled.footer.withConfig({ shouldForwardProp })(
  compose(...basicStyledSystem)
)

export default StyledFooter
