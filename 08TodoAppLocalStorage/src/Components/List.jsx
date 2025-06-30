import React, { use, useState } from 'react'

export default function List(
    { value,
        index,
        listData,
        setListData,
        taskCount,
        setTaskCount,
        completTask,
        setCompleteTask
    }) {

    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(value)
  
    let [listNum, setListNum] = useState(index + 1)

    function deleteList() {
        let fynalData = listData.filter((v, i) => i != index)
        setListData(fynalData)
    }

    function edit() {
        setIsEditing(true)
    }

    function handleEditChange(e) {
        setEditValue(e.target.value)
    }

    function saveEdit() {
        if (editValue.trim() === "") return
        const updatedList = listData.map((item, i) =>
            i === index ? editValue : item
        )
        setListData(updatedList)
        setIsEditing(false)
    }

    function handleEditKeyDown(e) {
        if (e.key === "Enter") {
            saveEdit()
        }
    }

    function completedTask() {
        console.log('completed  btn clicked')
    }

    return (
        <>
            <li>
                {isEditing ? (
                    <input
                       style={{backgroundColor:"transparent" ,
                         border:'none',
                         width:230,
                         height:40,
                         color:'#213547',
                         fontSize:15

                         
                        }}
                        type="text"
                        value={editValue}
                        onChange={handleEditChange}
                        onBlur={saveEdit}
                        onKeyDown={handleEditKeyDown}
                         
                    />
                ) : (
                    <p id='task'>{listNum}. {value}.</p>
                )}
                <span onClick={deleteList} id='deleteBtn'>Delete</span>
                <span onClick={edit} id='completeBtn'> Edit </span>
                <span onClick={completedTask} id='completeBtn'>Complete Task</span>
            </li>
        </>
    )
}
