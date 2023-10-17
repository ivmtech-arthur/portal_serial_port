import Block from 'components/Common/Element/Block'
import Footer_ from 'components/Common/Element/Footer'
// import { Button } from '@mui/material'
import { Divider } from '@mui/material'
import { } from '@mui/icons-material'
import Button4 from '../Button/Button4'
import StyledBody4 from '../Common/Element/body4'
import { useStore } from '/store'
import get from 'lodash/get'
import general from '../../data/general'
const Footer = () => {
  const handleToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
  const {
    state: {
      site: { lang },
    },
  } = useStore()
  const generalString = get(general, lang)
  return (
    <Footer_
      fontSize="18px"
      textAlign="center"
      position="relative"
      id="footer"
      // pt="20px"
    >
      <Divider
        sx={{ borderBottomWidth: 5, background: 'black' }}
      />
      <Block display='flex' justifyContent={{md:'space-between'}}  flexDirection={{md:'row',_:'column'}}>
        <StyledBody4>{generalString.copyright}</StyledBody4>
        <Block display={{md:'flex'}}>
          {/* <Button4>{generalString.policy}</Button4>
          <Button4>{generalString.tnc}</Button4> */}
        </Block>


      </Block>
    </Footer_>
  )
}

export default Footer
