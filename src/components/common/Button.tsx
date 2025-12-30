import { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  bgColor?: string
  textColor?: string
  px?: string
  py?: string
  fontSize?: string
}

export default function Button({
  children,
  bgColor = "bg-[#0f4a45]",
  textColor = "text-white",
  px = "px-3",
  py = "py-[13px]",
  fontSize = "text-base",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${bgColor}
        ${textColor}
        ${px}
        ${py}
        ${fontSize}
        ${className}
        transition
        hover:opacity-90
      `}
      {...props}
    >
      {children}
    </button>
  )
}
