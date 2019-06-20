import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import AppContainer from 'App/components/AppContainer'
import configureStore from 'App/redux/store'
import './css/style.css'

// Create app
const container = document.querySelector('#app-container')

// Render app
ReactDOM.render(
  <Provider store={configureStore()}>
    <AppContainer/>
  </Provider>, container)
