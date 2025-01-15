import logo from "../assets/images/logo.png"

const Sidebar: React.FC = () => {
  return (
    <aside className="w-3/12 bg-white h-screen shadow-lg">
      <img
        src={logo}
        className="absolute top-0 left-0 bg-darkblue p-6 rounded-br-3xl shadow-md"
        alt="Urbe Logo"
      />
    </aside>
  )
}

export default Sidebar
