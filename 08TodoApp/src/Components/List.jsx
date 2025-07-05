import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { GrCompliance } from "react-icons/gr";


export default function List({ value, index, inputText, setInputText, completedTasks, setCompletedTasks }) {

    let num = index + 1
    const [isActive, setIsActive] = useState(false)
    const [editvalue, setIsEditValue] = useState(value)



    function handelDelete() {
        let newData = inputText.filter((v, i) => i != index)
        setInputText(newData)
    }

    function handelCompletedTasks() {
        let completedData = inputText.filter((v, i) => i === index)
        let newData = inputText.filter((v, i) => i != index)
        setInputText(newData)
        let fynData = [...completedTasks, completedData]
        setCompletedTasks(fynData)
    }

    function handelEdit() {
        // Create a copy of inputText and update the value at the current index
        const updatedList = inputText.map((item, i) =>
            i === index ? editvalue : item
        );
        setInputText(updatedList);
    }

    return (
        <li>
            {isActive ? (

                <>
                    <input
                        id='editInput'

                        placeholder=' Edit your Task'
                        value={editvalue}
                        onChange={(e) => { setIsEditValue(e.target.value) }}
                        type="text" />
                    <button
                        onClick={
                            () => {
                                setIsActive(false)
                                handelEdit()
                            }
                        }>Save</button>
                </>
            ) : (

                <>
                    <p className='list'>  {num}. {value}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
                        <button id='btn' onClick={handelDelete}><MdDelete /></button>
                        <button id='btn' onClick={() => isActive ? setIsActive(false) : setIsActive(true)}><TbEdit /></button>
                        <button id='btn' onClick={handelCompletedTasks}><GrCompliance /></button>
                    </div>
                </>
            )}



        </li>
    )
}
