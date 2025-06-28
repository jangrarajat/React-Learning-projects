import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
 import { counterContext } from './Context/Context'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <counterContext.Provider value={{count , setCount}}>


      <div className="card bg-amber-300 rounded-2xl ">
            <div>
          <Navbar />
        </div>
        <button onClick={() => setCount((count) => count + 1)} className='bg-amber-600 w-30 h-15 rounded-2xl hover:border-b-gray-300'>
          count is {count}
        </button>

      </div>
     </counterContext.Provider>
    

    </>
  )
}

export default App
