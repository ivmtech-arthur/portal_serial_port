const initialState = {
  showHamburgerMenu: false,
}

function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case 'setShowHamburgerMenu': {
      return {
        ...state,
        showHamburgerMenu: payload,
      }
    }
    default:
      return state
  }
}

export default {
  name: 'header',
  initialState,
  reducer,
}
