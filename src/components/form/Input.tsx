import React from "react"
import { twMerge } from "tailwind-merge"
import { UseFormRegisterReturn } from "react-hook-form"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  register?: UseFormRegisterReturn
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, register,...props}, ref) => {
    const inputProps = {
      ...props,
      ...register,
      ref };
  

  return (
    <input
      {...inputProps}
      className={twMerge(
        "focus:outline-lightblue rounded-lg bg-gray text-gray-3 p-2",
        className
      )}
    />
  )
    }
  );


  export default Input

/* const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, register, ...props }, ref) => {
  return (
    <input
      {...props}
      {...register}
      ref={ref}
      className={twMerge(
        "focus:outline-lightblue rounded-lg bg-gray text-gray-3 p-2",
        className
      )}
    />
  )
});

 */
