import { useState, useRef } from 'react'

import './App.css'

function App() {
  let [gmail, setGmail] = useState([])
  let gmailRef = useRef(null)
  function gmailGenrator() {
    let latter = 'abcdefghijklmnopqrstuvwxyz'
    let str = []
    let mailNumb = 0
    for (let i = 1; i <= 8; i++) {
      str += latter[Math.floor(Math.random() * 26)]
    }
    for (let i = 1; i <= 3; i++) {
      str += Math.floor(Math.random() * 9)
    }
    setGmail(str + '@gmail.com')
    setLen(str.length)
  }
  function copyGmailFun() {
    gmailRef.current?.select()
    window.navigator.clipboard.writeText(gmail)
  }

  return (
    <>
      <div style={{ width: 400, height: 250, background: '#007fff', borderRadius: 30 }}>
        <h2>Gmail Genrator</h2>
        <input type="text" readOnly
          placeholder='Genrate your rendom gmail '
          value={gmail}
          style={{ width: 280, height: 30, marginBottom: 30, paddingLeft: 10 }}
          ref={gmailRef}
        />
        <br /><br />

        <br />
        <button
          onClick={() => {
            gmailGenrator()
          }}
        >Genrate Gmail</button>
        <button
          onClick={copyGmailFun}
          style={{ marginLeft: 4 }}
        >Copy Gmail</button>



      </div>

    </>
  )
}

export default App
