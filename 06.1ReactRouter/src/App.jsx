import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar'
import './App.css'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'
import Home from './Components/Home'
import Projects from './Components/Projects'
import Task from './Components/Task'
import About from './Components/About'
import User from './Components/User'
import Footer from './Components/Footer'
import Contact from './Components/Contact'



function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<><Navbar/><Home/><Footer/></>
    },
      {
      path:'/projects',
      element:<><Navbar/><Projects/><Footer/></>
    },
       {
      path:'/task',
      element:<><Navbar/><Task/><Footer/></>
    },
       {
      path:'/about',
      element:<><Navbar/><About/><Footer/></>
    },
        {
      path:'/user/:username',
      element:<><Navbar/><User/><Footer/></>
    },
         {
      path:'/contact',
      element:<><Navbar/><Contact/><Footer/></>
    }

  ])

  return (
    <>
   <RouterProvider router={router}/> 
    </>
  )
}

export default App
