import { useState, useEffect } from 'react'
import './App.css'
import useCurrencyInfo from './hooks/currency info'

function App() {
  const [amount, setAmount] = useState()
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  // Get all rates for the selected "from" currency
  const currencyInfo = useCurrencyInfo(from)
  // Get all available currencies from the keys of the rates object
  const currencies = Object.keys(currencyInfo || {})

  useEffect(() => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount((amount * currencyInfo[to]).toFixed(4))
    }
  }, [amount, from, to, currencyInfo])

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
  }

  return (
    <>
      <div id="main">
              

        <h1 id='heading' style={{fontSize:30 , fontWeight:'bolder'}}> CONVERT <span>{from.toLocaleUpperCase()}</span> To <span> {convertedAmount} {to.toLocaleUpperCase()}</span></h1>

        <div className="dataDiv">
          <div className="titleDiv">
            <p>From</p>
            <p>Currency</p>
          </div>
          <div className="titleDiv">
            <input
              id='input'
              type="number"
              value={amount}
              placeholder='0'
              onChange={e => setAmount(Number(e.target.value))}
            />
            <select
              value={from}
              onChange={e => setFrom(e.target.value)}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button id='swap' onClick={swap}>Swap</button>

        <div className="dataDiv">
          <div className="titleDiv">
            <input
              type="number"
              value={convertedAmount}
              readOnly
              placeholder='0'
            />
            <select
              value={to}
              onChange={e => setTo(e.target.value)}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
