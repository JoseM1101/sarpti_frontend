import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Home from "./pages/Home"
import DetailedEntity from "./pages/DetailedEntity"
import Layout from "./components/Layout"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/:title" element={<DetailedEntity />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
