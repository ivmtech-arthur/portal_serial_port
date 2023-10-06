import styled, { StyledComponent } from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

const StyledDiv = styled.div.withConfig({
  shouldForwardProp: (prop) => shouldForwardProp(prop, 'block'),
})(compose(...basicStyledSystem))

export default StyledDiv
