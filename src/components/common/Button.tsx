import { Loader2 } from "lucide-react"
import { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  bgColor?: string
  textColor?: string
  px?: string
  py?: string
  fontSize?: string,
  isLoading?: boolean
}

export default function Button({
  children,
  bgColor = "bg-[#0f4a45]",
  textColor = "text-white",
  px = "px-3",
  py = "py-[13px]",
  fontSize = "text-base",
  className = "",
  isLoading = false,
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
        cursor-pointer
        flex justify-center
      `}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
  )
}
