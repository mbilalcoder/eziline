import React, { useState } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import User from './components/User'
import ProtectedRout from './components/ProtectedRout'
import {Routes, Route} from 'react-router-dom'
import LogedIn from './components/context/LogedIn'


const App = () => {
  const [ logedIn, setLogedIn ] = useState(false)
  return (
    <>
    
      <LogedIn.Provider value={[logedIn, setLogedIn]}>
      <Routes>
        <Route path='/login' element={<Login/> } />
        <Route path='/signup' element={<SignUp/> } />
        <Route path='/' element={<ProtectedRout><User/></ProtectedRout> } />
      </Routes>
      </LogedIn.Provider>
    

    </>
  )
}

export default App
