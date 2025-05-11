import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("tomato")
 



  return (
    <>
      <div id='bodyji' style={{backgroundColor:color , }}>
     
        <div className='navbar'> 
          <div className="colourButton" onClick={()=>{setColor("orangered")}} id='orangered'>Orangered</div>
          <div className="colourButton" onClick={()=>{setColor("red")}} id='red'>Red</div>
          <div className="colourButton" onClick={()=>{setColor('purple')}} id='purple'>Purple</div>
          <div className="colourButton" onClick={()=>{setColor('violet')}} id='violet'>Violet</div>
          <div className="colourButton" onClick={()=>{setColor('indianred')}} id='indianred'>Indianred</div>
          <div className="colourButton" onClick={()=>{setColor('cyan')}} id='cyan'>Cyan</div>
          <div className="colourButton" onClick={()=>{setColor('tomato')}} id='tomato'>Tomato</div>
        </div>
      </div>
      
    </>
  )
}

export default App
