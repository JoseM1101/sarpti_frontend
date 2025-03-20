import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import backArrow from "../../assets/icons/arrow-back.svg"

interface BackButtonProps {
  className?: string
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className={twMerge(
        "flex gap-2 text-lg text-black font-semibold",
        className
      )}
    >
      <img className="w-7" src={backArrow} alt="" />
      Volver
    </button>
  )
}

export default BackButton
