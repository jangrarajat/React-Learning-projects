import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { createBrowserRouter ,RouterProvider} from 'react-router'
import Home from './Components/Home'
import Footer from './Components/Footer'
import Contact from './Components/Contact'
import About from './Components/About'



function App() {
 const router = createBrowserRouter([
  {
    path:'/',
    element:<><Navbar/><Home/><Footer/></>
  },
  {
    path:'/Contact',
    element:<><Navbar/><Contact/><Footer/></>
  },
  {
   path:'/About',
   element:<><Navbar/><About/><Footer/></>
  }


])

  return (
    <>
  <RouterProvider router={router}/>
    </>
  )
}

export default App
