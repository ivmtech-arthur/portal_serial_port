import { createContext, useContext, useReducer } from 'react'
import importAll from 'import-all.macro'
import map from 'lodash/map'
import get from 'lodash/get'
import merge from 'lodash/merge'
import reduce from 'lodash/reduce'

const reducers = map(
  importAll.sync('../reducers/*.js'),
  ({ default: reducer }) => reducer
)
const StoreContext = createContext(null)

const mainReducer = (state, action) => {
  return reduce(
    reducers,
    (result, { name, reducer }) => {
      const output = {}
      output[name] = reducer(get(state, `[${name}]`, {}), action)
      return {
        ...result,
        ...output,
      }
    },
    {}
  )
}

const StoreProvider = ({ children, injectStates }) => {
  const initialState = reduce(
    reducers,
    (result, { name, initialState }) => {
      const output = {}
      output[name] = initialState
      return {
        ...result,
        ...output,
      }
    },
    {}
  )

  const mainState = merge({}, initialState, injectStates)
  return (
    <StoreContext.Provider value={useReducer(mainReducer, mainState)}>
      {children}
    </StoreContext.Provider>
  )
}

const useStore = () => {
  const [state, dispatch] = useContext(StoreContext)
  return {
    state,
    dispatch,
  }
}

export { StoreProvider, useStore }
