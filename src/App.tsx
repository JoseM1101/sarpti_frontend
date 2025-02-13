import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import DetailedEntity from "./pages/DetailedEntity"
import Layout from "./components/Layout"
import "./config/axiosConfig"
import UserGrid from "./components/user/UserGrid"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Routes available once logged in */}
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<DetailedEntity />} />
          <Route path="investigadores" element={<UserGrid />} />
        </Route>

        {/* Fallback redirects to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
