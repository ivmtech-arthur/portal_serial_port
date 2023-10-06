import Block from 'components/Common/Element/Block'
import { useRouter } from 'next/router'
import { useStore } from '/store'
import get from 'lodash/get'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import general from '../../data/general'
import Button5 from '../Button/Button5'
const StyledHeaderContainer = styled(Block)``

const Header = (props) => {
  const { headerButtonTheme, headerTheme, headerPosition } = props
  const router = useRouter()
  const {
    state: {
      site: { lang, storeHeaderTheme },
    },
    dispatch,
  } = useStore()
  const [selectedLang, setSelectLang] = useState(lang)
  useEffect(() => {
    const urlLang = get(window, 'location.href', '').match(/\/(tc|en)/)
    if (get(urlLang, '[1]') && selectedLang !== get(urlLang, '[1]')) {
      dispatch({
        type: 'switchLang',
        payload: { lang: selectedLang },
      })
      router.push(
        window.location.href.replace(
          '/' + get(urlLang, '[1]'),
          '/' + selectedLang,
        ),
      )
    }
    dispatch({ type: 'setLoading', payload: { value: false } })
  }, [selectedLang])

  const generalString = get(general,lang)

  return (
    <>
      <StyledHeaderContainer
        id="header"
        // position={"fixed"}
        top="0"
        zIndex="101"
        backgroundColor={headerTheme === 'white' ? '#8EC9C0' : 'transparent'}
        // width="100%"
      >
        <Button5
          onClick={() => {
            // console.log("generalString.switchLangCode",generalString.switchLangCode,selectedLang)
            setSelectLang(generalString.switchLangCode)
          }}>{generalString.lang}</Button5>
      </StyledHeaderContainer>
      {/* <Popup type="local" propsToPopup={{ menuItems: mobileMenuItems }} /> */}
    </>
  )
}

export default Header
