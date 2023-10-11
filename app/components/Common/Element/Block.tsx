import styled, { StyledComponent } from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from './styled-props-handler'

interface BlockProps { 
  [name: string]: any
  // readonly display: string,
}

const StyledDiv = styled.div.withConfig<BlockProps>({
  shouldForwardProp: (prop: any) => shouldForwardProp(prop, 'block'),
})(compose(...basicStyledSystem))

export default StyledDiv
