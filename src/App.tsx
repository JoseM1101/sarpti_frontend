import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import InvestigationsPage from "./pages/InvestigationsPage"
import ProjectsPage from "./pages/ProjectsPage"
import Login from "./pages/Login"
import Administration from "./pages/Administration"
import DetailedEntity from "./pages/DetailedEntity"
import Layout from "./components/Layout"
import "./config/axiosConfig"
import UserGrid from "./components/user/UserGrid"
import ProtectedRoute from "./guard/protectedRoute"


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/investigaciones" element={<InvestigationsPage />} />
            <Route path="/proyectos" element={<ProjectsPage />} />
            <Route path=":type/:id" element={<DetailedEntity />} />
            <Route path="/investigadores" element={<UserGrid />} />
            <Route path="/administracion" element={<Administration />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;