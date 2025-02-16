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
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":type/:id" element={<DetailedEntity />} />
          <Route path="investigadores" element={<UserGrid />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
