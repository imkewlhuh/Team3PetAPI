// delete everything here and type rfce to get react  
import React from 'react';
import axios from 'axios'; 
import { useState } from 'react'
import { Fragment } from 'react'
import { Button, FormControl, FormLabel, Alert, Input, AlertIcon } from '@chakra-ui/react'
import reactLogo from './assets/react.svg'
import './App.css'
import './App2.css'

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiaGl3b3QiLCJpZCI6M30sImlhdCI6MTY3NzcyNjIzOH0.TXBBnQ5Ab4PrVxfqAeYrYjGKvIvbgyks2iWTgG9dTp0"

function Navbar(){
  return(
    <div className="navbar">
      <h1>Pets App</h1>
      <div className='menu-link'>
        <a href=''>Home</a>
        <a href=''>About</a>
        <a href=''>Contact</a>
      </div>
    </div>
  )
}

function Sidebar(){
  return(
    <div className="sidebar">
      <h1>sidebar</h1>
      <div className='sidebar-link'>
        <a href=''>Home</a>
        <a href=''>About</a>
      
      </div>
    </div>
  )
}

function Layout(props){
  return(
    <div className="layout">
      {props.children}
    </div>
  )
}

function Login(props){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ error, setError ] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    let session_url = "http://localhost:8080/auth/login"
    axios.post(session_url, {username, password}, {
      
      
    }).then(response => {
      if(response.status == 200){
        console.log("logged in2");
        props.setLoginUser(true); 
        setError(false)
      } else {
        props.setError(true)
        console.log("error");
      }
      console.log(response)
      console.log("Logged in")
    }).catch(error => {
      setError(true)
        console.log("error");
      
    })
    
    ;

  }
  
    return (
      <div>
        {error ? <div>That was the wrong username and/or password</div> 
        : <div>Welcome to the Pet App</div>}
  
        {/* we use onSubmit to every single time we submit login, we submit the form itself */}
        <form onSubmit={(e) => handleLogin(e)}>
          <input onChange={(e)=> setUsername(e.target.value)} type="text" name="username" />
          <input onChange={(e)=> setPassword(e.target.value)} type="password" name="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
  

  
//}

function SignUp(props){
  
  const handleLogin = (e) => {
    e.preventDefault();
    props.setLoginUser(true)
    
  }

  return (
   <div>
    <form onSubmit={(e) => handleLogin(e)}>
      <FormControl>
        <FormLabel>New Username</FormLabel>
        <Input type="text" name="username" />
      </FormControl>
      <FormControl marginBottom={10}>
        <FormLabel>New Password</FormLabel>
        <Input type="password" name="password" />
      </FormControl>
        {/* <input onChange={(e)=> setUsername(e.target.value)} type="text" name="username" />
        <input onChange={(e)=> setPassword(e.target.value)} type="password" name="password" />
        <input type="submit" value="Login" /> */}
        <Button colorScheme='blue' width="20%" marginBottom={5}>Register</Button>
      </form>
   </div>
   
  )
}


function App() {
  // lets create our isUserLoggedIn state
  const [ isUserLoggedIn, setUserLoggedIn ] = useState(false);
  const [ showLogin, setShowLogin ] = useState(true); 
  return (
    <div className="app">
      {
        isUserLoggedIn ? 
      //using fragment <> </> 
      <>
          {/* div for nav bar */}
          <div>
            <Navbar />
          </div> 

          {/* div for sidebar and layout  */}
          <div className='main-box'>
            <Sidebar />
            <Layout>
              <h1>Hello world</h1>
            </Layout> 
          </div>
      </>
     : 
        showLogin ?
        <>
        <Login setLoginUser={setUserLoggedIn} />
        </>
        :
        //make another component here for the signup page
        <>
        <SignUp setLoginUser={setUserLoggedIn} />
        
      </> 
      
    }
    <div className='app2'>
    <Button width="20%" onClick={() => setShowLogin(!showLogin)} type="submit" value="Login">{showLogin ? "Sign Up" : "Login"}</Button>
    </div>
  </div>
)}

export default App