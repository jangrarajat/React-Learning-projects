import React from 'react'
import { MdDelete } from 'react-icons/md'
import { TbEdit } from 'react-icons/tb'
import { GrStatusGood } from "react-icons/gr";

export default function CompletedTask({ value, index , completedTasks, setCompletedTasks,  inputText,setInputText}) {

  let num = index + 1
  
 function deleteCompletedTask() {
        let newData = inputText.filter((v, i) => i != index)
        setInputText(newData)
    }

  return (
 
      <li id='completedLi'>

        <p className='list'>  <GrStatusGood />  {num}. {value}</p>
      

      </li>
   
  )
}
