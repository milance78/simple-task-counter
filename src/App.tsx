import React from 'react'
import SideMenu from './components/sideMenu/SideMenu'
import Main from './components/main/Main'
import './App.scss'

const App = () => {
  return (
    <div className={'app'}>
      <SideMenu />
      <Main />
    </div>
  )
}

export default App