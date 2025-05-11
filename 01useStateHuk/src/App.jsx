import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function addFun() {
    if (count === "Please add some value") {
      setCount(0)
    } else {
      setCount(count + 1)
    }

  }
  function subFUn() {
    if (count === 0 || count === "Please add some value") {
      setCount("Please add some value")
    } else {
      setCount(count - 1)
    }
  }
  function mulFun() {
    if (count === 0 || count === "Please add some value") {
      setCount("Please add some value")
    } else {
      setCount(count * 2)
    }


  }
  function divFun() {
    if (count === 0 || count === "Please add some value") {
      setCount("Please add some value")
    } else {
      setCount(count / 2)
    }

  }



  return (
    <>
      <h1>Count Value </h1>
      <h1>{count}</h1>
      <div>
        <button onClick={addFun}>Add</button>
        <button onClick={subFUn}>Subtract</button>
        <button onClick={mulFun}>Multiply</button>
        <button onClick={divFun}>Divide</button>

      </div>
    </>
  )
}

export default App
