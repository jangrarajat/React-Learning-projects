import { useEffect, useState } from 'react'
import { IoAddCircle } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import './App.css'
import List from './Components/List';
import CompletedTask from './Components/CompletedTask';

function App() {
  const [inputText, setInputText] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [taskLenth,setTaskLenth  ]=useState(0)
  const [completLenth,setCompletLenth]=useState(0)
  let liLenth = inputText.length

  let completedLenth = completedTasks.length
 
  useEffect(()=>{
     setTaskLenth(liLenth)
     setCompletLenth(completedLenth)
  },[inputText,completedTasks])

  function handelInputData(e) {
    e.preventDefault()
    let text = e.target.inputText.value
    if (text === '') {
      alert('Enter task')
    }
    else {
      let data = [...inputText, e.target.inputText.value ]
          // createdAt: new Date().toLocaleTimeString()
      setInputText(data)
      e.target.inputText.value = ''
    }


  }



  let taskLi = inputText.map((value, index) => {
    return (
      <List

        value={value}
        index={index}
        key={index}
        inputText={inputText}
        setInputText={setInputText}
        completedTasks={completedTasks}
        setCompletedTasks={setCompletedTasks} />

    )

  })

  let completedLi = completedTasks.map((value, index) => {
    return (
      <CompletedTask

        value={value}
        index={index}
        key={index}
        completedTasks={completedTasks}
        setCompletedTasks={setCompletedTasks} />
    )
  })




  return (
    <>

      <div id='box'>

        <h1>Todo</h1>
          <h2>Your tasks {taskLenth}</h2>
           <h2>Your completed tasks {completLenth}</h2>
        <form onSubmit={handelInputData}>
          <input type="text" name='inputText' placeholder='Enter Task' style={{ height: 33, paddingLeft: 10 }} />
          <button ><IoAddCircle /></button>

        </form>


        <ul id='taskUl'>
          {taskLi}
        </ul>

        <footer>
          <h2 style={{ textDecoration: 'underline' }}>Completed Task</h2>
         
          <ul>
            {completedLi}
          </ul>
        </footer>
      </div>

    </>
  )
}

export default App
