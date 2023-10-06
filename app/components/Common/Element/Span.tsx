import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

const StyledSpan = styled.span.withConfig({
  shouldForwardProp: (prop) => shouldForwardProp(prop, 'span'),
})(compose(...basicStyledSystem))

export default StyledSpan
