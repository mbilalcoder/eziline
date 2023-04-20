import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import LogedIn from './context/LogedIn';


const ProtectedRout = ({children}) => {
    const [logedIn, setLogedIn] = useContext(LogedIn)
    
    if(!logedIn){
        return <Navigate to='/login' />
    }else{
          return children
      }
}

export default ProtectedRout
