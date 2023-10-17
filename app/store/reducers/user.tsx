const initialState = {
  authenticated: false,
  userProfile: {},
}

// Please update the reducer counter in storeHandler when you add new reducer
function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case 'setAuthenticated': {
      const { authenticated } = payload
      return {
        ...state,
        authenticated,
      }
    }
    case 'setUserProfile': {
      const { profile } = payload
      return {
        ...state,
        profile,
        authenticated: true,
      }
    }
    case 'setRole': {
      const { role } = payload
      return {
        ...state,
        role,
      }
    }
    default:
      return state
  }
}

export default {
  name: 'user',
  initialState,
  reducer,
}
