import { VariantProps, cva } from "class-variance-authority"
import { ButtonHTMLAttributes } from "react"
import { cn } from "@/utils"

const buttonVariants = cva("text-white rounded-sm py-1 px-3", {
  variants: {
    bgColor: {
      lightblue: "bg-lightblue",
      green: "bg-green",
    },
  },
  defaultVariants: {
    bgColor: "lightblue",
  },
})

interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ className, bgColor, ...props }) => {
  return (
    <button className={cn(buttonVariants({ bgColor, className }))} {...props} />
  )
}

export default Button
