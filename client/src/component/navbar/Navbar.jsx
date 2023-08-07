import React from 'react'
import "./nav.css"
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  function logout(){
    localStorage.clear()
    navigate("/login")
  }
  return (
    <div className='navbar'>
      <h2 onClick={()=>{navigate("/")}}>TODO LIST</h2>
     <ul>
      <li onClick={()=>{navigate("/")}}>Home</li>
      {
        localStorage.getItem("userToken") ? <li onClick={logout}>log out</li> : 
        <>
        <li onClick={()=>{navigate("/login")}}>login</li>
      <li onClick={()=>{navigate("/register")}}>Sign in</li></>
      }
      
     </ul>
      
    </div>
  )
}

export default Navbar
