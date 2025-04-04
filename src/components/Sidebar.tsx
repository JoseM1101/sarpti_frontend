import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import logo from "../assets/images/logo.png"
import { twMerge } from "tailwind-merge"
import investigaciones from "../assets/icons/investigaciones.png"
import administracion from "../assets/icons/administracion.png"
import investigadores from "../assets/icons/investigadores.png"
import Cookies from "js-cookie"

const linksFirst = [
  {
    icon: investigaciones,
    text: "Investigaciones",
    to: "/investigaciones",
  },
  {
    icon: investigaciones,
    text: "Proyectos",
    to: "/proyectos",
  },
  {
    icon: investigadores,
    text: "Investigadores",
    to: "/investigadores",
  },
]

const linksSecond = [
  {
    icon: administracion,
    text: "Administracion",
    to: "/administracion",
  },
]

const LinkRenderer = ({
  icon,
  text,
  to,
}: {
  icon: string
  text: string
  to: string
}) => {
  const location = useLocation() // Get the current path

  return (
    <Link to={to} className="flex gap-2">
      <img className="object-contain" src={icon} alt="" />
      <p
        className={twMerge(
          "text-xl font-normal",
          location.pathname === to
            ? "text-lightblue font-semibold"
            : "text-gray-3"
        )}
      >
        {text}
      </p>
    </Link>
  )
}

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const userid = Cookies.get("userid")
      await axios.post(`/logout/${userid}`, {}, { withCredentials: true })

      Cookies.remove("token")
      Cookies.remove("usuario")
      Cookies.remove("userid")

      navigate("/login")
    } catch (error) {
      console.error("Error en el logout:", error)
    }
  }

  return (
    <aside
      className={twMerge(
        className,
        "fixed left-0 top-0 z-10 bg-white h-screen shadow-lg flex items-center"
      )}
    >
      <Link to="/investigaciones">
        <img
          src={logo}
          className="absolute top-0 left-0 bg-darkblue p-8 rounded-br-3xl shadow-md"
          alt="Urbe Logo"
        />
      </Link>
      <div className="flex flex-col font-semibold ml-10">
        <h2 className="text-5xl text-gray-3">CIDETIU</h2>
        <span className="h-px bg-gray-2 w-full my-8"></span>
        <div className="flex flex-col gap-8">
          {linksFirst.map((link) => (
            <LinkRenderer key={link.text} {...link} />
          ))}
        </div>
        <span className="h-px bg-gray-2 w-full my-8"></span>
        {linksSecond.map((link) => (
          <LinkRenderer key={link.text} {...link} />
        ))}
        <span className="h-px bg-gray-2 w-full my-8"></span>
      </div>
      <div className="absolute left-10 bottom-5">
        <button onClick={handleLogout} className="text-xl text-gray-3 ">
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
