import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import logo from "../assets/images/logo.png"
import { twMerge } from "tailwind-merge"
import panel_de_control from "../assets/icons/panel_de_control.png"
import investigaciones from "../assets/icons/investigaciones.png"
import administracion from "../assets/icons/administracion.png"
import perfil from "../assets/icons/perfil.png"
import investigadores from "../assets/icons/tutores.png"

const linksFirst = [
  {
    icon: panel_de_control,
    text: "Panel de control",
    to: "/",
  },
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

const LinkRenderer = ({ icon, text, to }: { icon: string; text: string; to: string }) => {
  return (
    <Link to={to} className="flex gap-2">
      <img className="object-contain" src={icon} alt="" />
      <p className="text-gray-3 text-xl font-normal">{text}</p>
    </Link>
  )
}

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const userEmail = localStorage.getItem("userEmail")
    if (!userEmail) {
      console.error("User email not found in localStorage")
      return
    }

    try {
      const usuariosResponse = await axios.get("/usuarios")
      const responseData = usuariosResponse.data;

      if (responseData && Array.isArray(responseData.list)) {
        const matchedUser = responseData.list.find((user: { correo: string }) => user.correo === userEmail)

        if (matchedUser) {
          const userId = matchedUser.id
          await axios.post(`/logout/${userId}`)
          localStorage.removeItem("userEmail")
          navigate("/login")
        } else {
          console.error("No matching user found in /usuarios")
        }
      } else {
        console.error("The /usuarios endpoint did not return a valid object with a 'list' array")
      }
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <aside
      className={twMerge(
        className,
        "fixed left-0 top-0 z-10 bg-white h-screen lg:w- shadow-lg flex items-center"
      )}
    >
      <Link to="/">
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
      {/* Logout button added at the bottom */}
      <div className="absolute left-10 bottom-16">
        <button
          onClick={handleLogout}
          className="flex gap-2 items-center text-xl text-gray-600 hover:text-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
      <div className="absolute left-10 bottom-5">
        <LinkRenderer icon={perfil} text="Perfil" to="/perfil" />
      </div>
    </aside>
  )
}

export default Sidebar
