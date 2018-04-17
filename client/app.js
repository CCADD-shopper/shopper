import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import UserList from './components/user/user-list'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
