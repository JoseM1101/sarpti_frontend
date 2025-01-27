import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-3/12" />
      <main className="w-9/12 p-4 ml-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
