import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

const Layout: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
