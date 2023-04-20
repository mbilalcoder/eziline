import { useEffect, useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom"
import UsersData from "./usersApi";

const getLocalData = () => {
  const usersList = localStorage.getItem("ezilinUsers");
  if (usersList) {
    return JSON.parse(usersList);
  } else {
    return UsersData;
  }
};

const SignUp = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userName, setUserName] = useState("")
  const [users, setUsers] = useState(getLocalData())
  const navigate = useNavigate()


  const loginHandeler = () => {
    navigate('/login')
  }

  const setUserVal = (e) => {
    setUserName(e.target.value)
  }

  const setEmailVal = (e) => {
    setEmail(e.target.value)
  }

  const setPasswordVal = (e) => {
    setPassword(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const inputVal = {
      name: userName,
      email: email,
      password: password,
      role: "employ"
    }

    const userExists = users.filter((el) => {
      return el.email === email;
    });

    if (userExists.length !== 0) {

      alert("user already exists")

    } else {
      if (email === "" || password === "" || userName === "") {
        alert('please fill all fields')
      } else {
        setUsers([...users, inputVal])
        setEmail('')
        setPassword('')
        setUserName('')
        alert('user added')
      }

      // navigate('/login')
    }



  }

  useEffect(() => {

    localStorage.setItem("ezilinUsers", JSON.stringify(users));

  }, [users])


  return (
    <>
      <form>
        <label htmlFor='uName'>User Name</label>
        <input value={userName} onChange={setUserVal} type="text" placeholder='User Name' name='name' />
        <label htmlFor='uEmail'>User Email</label>
        <input value={email} onChange={setEmailVal} type="email" placeholder='User Email' name='email' />
        <label htmlFor='password'>Password</label>
        <input value={password} onChange={setPasswordVal} type="password" placeholder='setPassword' name='passward' />
        <button onClick={submitHandler}>Sign Up</button>
      </form>
      <button onClick={loginHandeler}>Login</button>


    </>
  )
}
export default SignUp