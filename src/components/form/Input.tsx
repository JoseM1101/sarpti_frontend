import { twMerge } from "tailwind-merge"
import { UseFormRegisterReturn } from "react-hook-form"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  register?: UseFormRegisterReturn
  error?: string
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={twMerge(
        "focus:outline-lightblue rounded-lg bg-gray text-gray-3 p-2",
        className
      )}
    />
  )
}

export default Input
