import React from 'react'

import { Navbar, LeftBar } from './components'
import Routes from './routes'
// import UserList from './components/user/user-list'


const App = () => {
  return (
    <div>
      <Navbar />
      <div className="contentWrapper">
        <LeftBar />
        <Routes />
      </div>
      {/* <UserList /> */}
    </div>
  )
}

export default App
