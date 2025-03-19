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
import ResearchersPage from "./pages/ResearchersPage"
import ProtectedRoute from "./guard/protectedRoute"
import { MessageProvider } from "./components/providers/MessageProvider"
import MessageModal from "./components/common/MessageModal"
import React, { useState } from "react";
import GlobalLoader from "./components/common/GlobalLoader";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <MessageProvider>
      <GlobalLoader visible={loading} />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/investigaciones" element={<InvestigationsPage />} />
              <Route path="/proyectos" element={<ProjectsPage />} />
              <Route path=":type/:id" element={<DetailedEntity />} />
              <Route path="/investigadores" element={<ResearchersPage />} />
              <Route path="/administracion" element={<Administration />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      <MessageModal />
    </MessageProvider>
  )
}

export default App
