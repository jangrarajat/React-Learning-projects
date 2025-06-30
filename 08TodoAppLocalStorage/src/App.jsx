import { useState, useEffect } from 'react'
import './App.css'
import List from './Components/List';


function App() {
  const [taskCount, setTaskCount] = useState(0)
  const [listData, setListData] = useState([])
  const [completTask, setCompletTask] = useState([])

  useEffect(() => {
    let dataLenth = listData.length
    setTaskCount(dataLenth)
  }, [listData])

  function saveInput(e) {

    e.preventDefault();

    let inputData = e.target.inputData.value
    if (inputData === '') {
      alert("Please Enter Some Task ")
    }
    else if (!listData.includes(inputData)) {
      let finalData = [...listData, inputData]
      setListData(finalData)

    }
    else {
      alert('This task is allrady added')


    }

    e.target.inputData.value = ''
  }

  let liItems = listData.map((value, index) => {

    return (
      <List value={value}
        key={index}
        index={index}
        listData={listData}
        setListData={setListData}
        setTaskCount={setTaskCount}
        taskCount={taskCount}
        completTask={completTask}
        setCompletTask={setCompletTask}
      />
    )
  })



  return (
    <>
      <main>
        <h1>Task App</h1>
        <form onSubmit={saveInput}>
          <div id='inputDiv'>
            <input type="text" name='inputData' style={{ width: 220, height: 38.2, paddingLeft: 10 }} />
            <button id='addBtn' >Add Task</button>
          </div>
        </form>
        <ul>

          {liItems}

        </ul>
        <hr />

        <div style={{ height: 30, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <p style={{ textAlign: 'start', marginLeft: 30 }}> Task {taskCount} </p>
          <button
            id='completedTask'
          >Completed Task</button>
        </div>
      </main>


    </>
  )
}

export default App
