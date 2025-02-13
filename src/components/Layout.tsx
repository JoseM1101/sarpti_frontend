import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"

const Layout: React.FC = () => {
  const location = useLocation()
  const hideSidebar = location.pathname === "/login"

  return (
    <div className="flex min-h-screen">
      {!hideSidebar && <Sidebar className="w-3/12" />}
      <main className="w-9/12 p-4 ml-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
