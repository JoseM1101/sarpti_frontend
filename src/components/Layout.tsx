import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"

const Layout: React.FC = () => {
  const location = useLocation()
  const hideSidebar = location.pathname === "/login"

  return (
    <div className="flex min-h-screen">
      {!hideSidebar && <Sidebar />}
      <main className="flex-1 ml-0 lg:ml-72 p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
