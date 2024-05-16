import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Event from "./pages/Event"
import ProtectedRoute from "./components/ProtectedRoute"
import EvaluationForm from "./pages/form"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/upload" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/event" element={<ProtectedRoute><Event /></ProtectedRoute>} />
        <Route path="/evaluationForm" element={<ProtectedRoute><EvaluationForm /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App