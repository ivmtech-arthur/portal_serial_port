import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

const StyledStop = styled.stop.withConfig({
  shouldForwardProp: (prop) => shouldForwardProp(prop, 'stop'),
})(compose(...basicStyledSystem))

export default StyledStop
