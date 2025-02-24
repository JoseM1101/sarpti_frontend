"use client"

import * as React from "react"

interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ checked = false, onCheckedChange }, ref) => {
  const handleClick = () => {
    onCheckedChange?.(!checked)
  }

  return (
    <div
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      className="relative inline-block w-12 h-7 cursor-pointer"
    >
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0 absolute"
        ref={ref}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        tabIndex={-1}
      />
      <div
        className={`
            absolute inset-0 rounded-full
            transition-all duration-300 ease-in-out
            ${checked ? "bg-green" : "bg-gray"}
          `}
      >
        <div
          className={`
              absolute w-5 h-5 bg-white rounded-full
              shadow-md transform transition-transform duration-300 ease-in-out
              top-1 left-1
              ${checked ? "translate-x-5" : "translate-x-0"}
            `}
        />
      </div>
    </div>
  )
})
Switch.displayName = "Switch"

export { Switch }
