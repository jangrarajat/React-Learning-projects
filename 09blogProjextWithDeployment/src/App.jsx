import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authSevice from "./appwrite/auth"
import {login , logout} from "./Store/authSlice"


function App() {
   const [loading , setLoading] = useState(true)
   const despatch =useDispatch()

   useEffect(()=>{
    authSevice.getCurrentUser()
    .then((useData)=>{
      if(useData){
        despatch()
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{setLoading(false)})
   },[])

  return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
       <Header/>
       <main>
 <h1>hi</h1>

       </main>
       <Footer/>
    </div>
  </div>
  ) : (null)
}
import { Form } from 'react-hook-form'
import { Footer, Header } from './components'

export default App
