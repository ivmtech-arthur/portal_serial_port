import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

const StyledAnchor = styled.a.withConfig({
  shouldForwardProp: (prop) => shouldForwardProp(prop, 'anchor'),
})(compose(...basicStyledSystem))

export default StyledAnchor
