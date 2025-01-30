import logo from "../assets/images/logo.png"
import { twMerge } from "tailwind-merge"
import { Link } from "react-router-dom"
import panel_de_control from "../assets/icons/panel_de_control.png"
import investigaciones from "../assets/icons/investigaciones.png"
import administracion from "../assets/icons/administracion.png"
import perfil from "../assets/icons/perfil.png"

const linksFirst = [
  {
    icon: panel_de_control,
    text: "Panel de control",
  },
  {
    icon: investigaciones,
    text: "Investigaciones",
  },
]

const linksSecond = [
  {
    icon: administracion,
    text: "Administracion",
  },
]

const LinkRenderer = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <div className="flex gap-2">
      <img className="object-contain" src={icon} alt="" />
      <p className="text-gray-3 font-semibold text-xl font-normal">{text}</p>
    </div>
  )
}

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <aside
      className={twMerge(
        className,
        "fixed left-0 top-0 z-10 bg-white h-screen shadow-lg flex items-center"
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
      <div className="absolute left-10 bottom-5">
        <LinkRenderer icon={perfil} text="Perfil" />
      </div>
    </aside>
  )
}

export default Sidebar
