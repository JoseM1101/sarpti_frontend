import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import logo from "../assets/images/logo.png"
import { twMerge } from "tailwind-merge"
import investigaciones from "../assets/icons/investigaciones.png"
import administracion from "../assets/icons/administracion.png"
import perfil from "../assets/icons/perfil.png"
import investigadores from "../assets/icons/investigadores.png"

const linksFirst = [
  {
    icon: investigaciones,
    text: "Investigaciones",
    to: "/investigaciones",
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
  return (
    <Link to={to} className="flex gap-2">
      <img className="object-contain" src={icon} alt="" />
      <p className="text-gray-3 text-xl font-normal">{text}</p>
    </Link>
  )
}

// const token = getCookie("token")
// if (!token) {
//   console.error("Token not found in cookies")
//   return
// }
//   try {
//     // Assumes your backend expects the token in the Authorization header.
//     await axios.post(
//       "/logout",
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//     // Remove the token cookie by setting an expired date.
//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
//     navigate("/login")
//   } catch (error) {
//     console.error("Error logging out:", error)
//   }
// }

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    axios.post("/logout/user-001")
    navigate("/login")
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
      <div className="absolute left-10 bottom-16">
        <button
          onClick={handleLogout}
          className="flex gap-2 items-center text-xl text-gray-600 hover:text-red-600 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
      <div className="absolute left-10 bottom-5">
        <LinkRenderer icon={perfil} text="Perfil" to="/perfil" />
      </div>
    </aside>
  )
}

export default Sidebar
