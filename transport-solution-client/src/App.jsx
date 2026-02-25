import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/auth'
import Home from './pages/Home'
import ProtectedRoute from './utils/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </AuthProvider>
      </div>
    </>
  )
}

export default App
