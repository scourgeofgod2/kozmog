import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-black uppercase tracking-wide border-2 border-black transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-yellow-400 text-black hover:translate-x-[2px] hover:translate-y-[2px]",
        destructive:
          "bg-red-500 text-white hover:translate-x-[2px] hover:translate-y-[2px]",
        outline:
          "bg-white text-black hover:bg-yellow-50 hover:translate-x-[2px] hover:translate-y-[2px]",
        secondary:
          "bg-gray-100 text-black hover:bg-gray-200 hover:translate-x-[2px] hover:translate-y-[2px]",
        ghost:
          "border-transparent bg-transparent hover:bg-yellow-50 hover:border-black",
        link: "border-transparent text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isGhostOrLink = variant === "ghost" || variant === "link"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={
          isGhostOrLink
            ? style
            : { boxShadow: "3px 3px 0px #000", ...style }
        }
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
