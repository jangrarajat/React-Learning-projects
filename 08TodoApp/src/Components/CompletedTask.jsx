import React from 'react'

export default function CompletedTask({ value, index , completedTasks, setCompletedTasks}) {

  let num = index + 1
  


  return (
 
      <li>

        <p className='list'>  {num}. {value}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
         
          {/* <button id='btn'><TbEdit /></button> */}

        </div>

      </li>
   
  )
}
