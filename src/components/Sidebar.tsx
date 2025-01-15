import logo from "../assets/images/logo.png"
import { twMerge } from "tailwind-merge"

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <aside
      className={twMerge(
        className,
        "fixed left-0 top-0 z-10 bg-white h-screen shadow-lg flex items-center"
      )}
    >
      <img
        src={logo}
        className="absolute top-0 left-0 bg-darkblue p-8 rounded-br-3xl shadow-md"
        alt="Urbe Logo"
      />
      <div className="flex flex-col font-semibold ml-10">
        <h2 className="text-5xl text-zinc-700">CIDETIU</h2>
        <span className="h-px bg-zinc-300 w-full my-8"></span>
        <div className="flex flex-col gap-8">
          <p className="text-zinc-700 text-xl font-normal">Panel de control</p>
          <p className="text-zinc-700 text-xl font-normal">Investigaciones</p>
        </div>
        <span className="h-px bg-zinc-300 w-full my-8"></span>
        <p className="text-zinc-700 text-xl font-normal">Administracion</p>
        <span className="h-px bg-zinc-300 w-full my-8"></span>
      </div>
      <div className="absolute left-10 bottom-5">
        <p className="text-zinc-700 text-xl font-normal">Perfil</p>
      </div>
    </aside>
  )
}

export default Sidebar
