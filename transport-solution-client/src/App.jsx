import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/auth'
import Home from './pages/Home'
import {ProtectedRoute} from './utils/ProtectedRoute'
import { PublicRoute } from './utils/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <Routes>
          {/* Logged in user hi Home dekh sakta hai */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          {/* Logged in user /auth par nahi ja sakta */}
          <Route path="/auth" element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          } />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
