// delete everything here and type rfce to get react  
import React from 'react';
import axios from 'axios'; 
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from 'react'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import './App.css'
import './App2.css'
import Layout from "../pages/layout.jsx";
import PetPage from "../pages/petpage.jsx";
import PetUser from "../pages/pet-user.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getPet, getPetByUser } from '../api';


function Navbar(){
  return(
    <div className="navbar">
      <h1> You are logged in!</h1>
      <h1>Welcome to the Pets App</h1>
      
      <div className='menu-link'>
        <a href=''>Home</a>
        <a href=''>About</a>
        <a href=''>Contact</a>
      </div>
      <div>
      <a href=''>Log out</a>
      </div>
    </div>
  )
}

function Sidebar(){
  return(
    <div className="sidebar">
      <h1>Contents</h1>
     
    </div>
  )
}



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/pets",
        element: <PetPage />,
        loader: () => {
          return getPet();
        },
      }
    ],
  },
  {
    path: "/pets/user",
    element: <PetUser />,
    loader: ({ params }) => {
    const petUser = params.user;
    return getPetByUser(petUser);

      
    },
  }
  
]);

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
        console.log("Logged in");
        sessionStorage.setItem("token", response.data.token)
        props.setLoginUser(true); 
        setError(false)
      } 
      
    }).catch(error => {
      setError(true)
        console.log("error", error);
      
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
    <div className="app" style={{backgroundImage: `url("../images/pets.jpeg")`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%"}}>
      {
        isUserLoggedIn ? 
      //using fragment <> </> 
      <>
          {/* div for nav bar */}
          <div style={{backgroundImage: `url("../images/loggedin.jpeg")`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
            <Navbar />
          </div> 

          {/* div for sidebar and layout  */}
          <div className='main-box' style={{backgroundImage: `url("../images/pets2.jpeg")`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%"}}>
            <Sidebar />
            
            <ChakraProvider > 
              
                <RouterProvider router={router} />
             
            </ChakraProvider>
            
            
            
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