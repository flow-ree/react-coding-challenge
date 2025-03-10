import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'App/redux/reducers'

export default function configureStore(initialState={}) {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk)
      // ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
}
