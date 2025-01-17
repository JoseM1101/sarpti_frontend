import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Home from "./pages/Home"
import ProjectPage from "./pages/ProjectPage"
import Layout from "./components/Layout"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/ProjectPage" element={<ProjectPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
