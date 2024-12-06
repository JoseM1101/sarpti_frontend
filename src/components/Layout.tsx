import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

const Layout: React.FC = () => {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
