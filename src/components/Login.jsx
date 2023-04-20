import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogedIn from './context/LogedIn'
import UsersData from './usersApi'


const getLocalData = () => {
  const usersList = localStorage.getItem("ezilinUsers");
  if (usersList) {
    return JSON.parse(usersList);
  } else {
    return UsersData;
  }
};

const Login = () => {
  const [user, setUser]= useState("")
  const [pasword, setPasword]= useState("")
  const navigate = useNavigate();
  const [userList, setUsersList] = useState(getLocalData())
  const [logedIn, setLogedIn] = useContext(LogedIn)

  const signUpHandeler = () =>{
    navigate('/signup')
  }
  const submitHandle = (e) =>{
    e.preventDefault()
    const curUser = userList.filter((el)=>{
      return el.email === user && el.password === pasword
    })
    if(curUser.length === 0 ){
      alert("invalid input data")
    }else{
      setLogedIn(true)
      navigate('/', {state: curUser})
    }

    

  }
  
  

  return (
    <>
    <form>

      <label htmlFor='uName'>User Name</label>
      <input type="text" placeholder='User Name' name='uName'
      value={user}
      onChange={(e)=>setUser(e.target.value)}
      />

      <label htmlFor='uName'>Password</label>
      <input type="password" placeholder='Password Please' name='passward'
      value={pasword}
      onChange={(e)=>setPasword(e.target.value)} />

      <button onClick={submitHandle}>Login</button>
    </form>
    <button onClick={signUpHandeler}>Sign Up</button>


    </>
  )
}

export default Login

