import { useState, useCallback, useEffect , useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [number, setNumber] = useState(false)
  let [symble, setSymble] = useState(false)
  let [lenth, setLenth] = useState(8)
  let [password, setPassword] = useState("")

  // ref hook 
let passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if (symble) str += "!@#$%^&*"

    for (let i = 1; i <= lenth; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [number, symble, lenth, setPassword])

  let copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,40)
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => {
    passwordGenerator()
  }, [lenth, number, symble, setPassword])


  return (
    <>
      <div id="mainBox" style={{ width: 500, minHeight: 100, backgroundColor: 'white', borderRadius: 5, }}>
        <h2 style={{ color: 'black' }}>Password Generator</h2>
        <input type="text" 
        placeholder='Password' 
        value={password} readOnly 
        ref = {passwordRef}
        style={{ width: 400, color: 'white' }} />

       <br />
        <br />
        <input type="range" name="range" id="" min={6} max={100} value={lenth}
          onChange={(e) => { setLenth(e.target.value) }}

          style={{ width: 300, cursor: 'pointer' }} />
        <label htmlFor="range" >Password Lenth {lenth}</label>
        <br />

        <input onChange={() => {
          setNumber((prev) => !prev);
        }} type="checkbox" name="number" id="" style={{ width: 20, height: 20 }} />
        <label htmlFor="number">Number</label>

        <input onChange={() => {
          setSymble((prev) => !prev)
        }} type="checkbox" name="symble" id="" style={{ width: 20, height: 20 }} />
        <label htmlFor="symble">Symble</label>
        <br />
        <button
          onClick={
            () => {
              passwordGenerator()
            }
          }
      id='pasgen'    style={{  width: 400, marginTop: 10 }}
        >Generat Password</button>
        <button 
        onClick={copyPassword}
    id='copytx'    style={{ width: 400, marginBottom: 10, marginTop: 10 }}>
          Copy password</button>
      </div>

    </>
  )
}

export default App
