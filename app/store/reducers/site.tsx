import get from 'lodash/get'
import slice from 'lodash/slice'
import copy from 'data/copy'

const initialState = {
  lang: 'en',
  pageName: '',
  siteCopy: {},
  popup: false,
  popupType: '',
  loading: false,
  scanProcessing: false,
  popupGlobal: true,
  showHeaderStore: true,
  showBottomActionPaneStore: true,
  routeChain: [],
  routeFromBack: false,
  notice: false,
  noticeTitle: '',
  noticeMsg: '',
}

// Please update the reducer counter in storeHandler when you add new reducer

function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case 'switchLang': {
      const { lang, cookies } = payload
      // cookies.set('lang', lang, { path: '/' })
      const siteCopy = get(copy, `${lang}`)
      return {
        ...state,
        lang,
        siteCopy,
      }
    }
    case 'setPageName': { 
      const { pageName } = payload
      return { 
        ...state,
        pageName
      }
    }
    case 'setLoading': {
      return {
        ...state,
        loading: payload.value,
      }
    }
    case 'setScanProcessing': {
      return {
        ...state,
        scanProcessing: payload.value,
      }
    }
    case 'showPopup': {
      return {
        ...state,
        popup: payload.popup,
        popupType: payload.popupType,
        popupGlobal: get(payload, 'isGlobal'),
      }
    }
    case 'closePopup': {
      return {
        ...state,
        popup: '',
        popupType: '',
        popupGlobal: true,
      }
    }
    case 'setShowHeader': {
      return {
        ...state,
        showHeaderStore: payload,
      }
    }
    case 'setShowBottomActionPane': {
      return {
        ...state,
        showBottomActionPaneStore: payload,
      }
    }
    case 'addRouteChain': {
      return {
        ...state,
        routeChain: [...state.routeChain, payload.value],
      }
    }
    case 'removeRouteChain': {
      return {
        ...state,
        routeChain: slice(state.routeChain, 0, state.routeChain.length - 1),
      }
    }
    case 'setRouteFromBack': {
      return {
        ...state,
        routeFromBack: payload.value,
      }
    }
    case 'showNotice': {
      return {
        ...state,
        notice: payload.notice,
        noticeTitle: payload.noticeTitle,
        noticeMsg: payload.noticeMsg,
      }
    }
    case 'closeNotice': {
      return {
        ...state,
        notice: false,
        noticeTitle: '',
        noticeMsg: '',
      }
    }
    default:
      return state
  }
}

export default {
  name: 'site',
  initialState,
  reducer,
}
