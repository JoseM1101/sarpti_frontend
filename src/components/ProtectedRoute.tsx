import React from "react"
import { Outlet } from "react-router-dom"

const ProtectedRoute: React.FC = () => {
  // const token = localStorage.getItem("token")
  // return token ? <Outlet /> : <Navigate to="/login" replace />

  return <Outlet />
}

export default ProtectedRoute