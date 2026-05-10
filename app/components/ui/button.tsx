'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white shadow-lg hover:bg-blue-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
        secondary:
          'bg-white text-gray-900 border-2 border-gray-200 hover:border-primary hover:bg-gray-50',
        accent:
          'bg-accent text-gray-900 shadow-lg hover:bg-yellow-400 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
        outline:
          'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-50',
        ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
        link: 'text-primary underline-offset-4 hover:underline shadow-none',
        destructive:
          'bg-red-500 text-white shadow-md hover:bg-red-600',
      },
      size: {
        sm: 'h-9 px-3 text-sm [&_svg]:size-4',
        md: 'h-11 px-5 text-sm [&_svg]:size-4',
        lg: 'h-14 px-8 text-base [&_svg]:size-5',
        xl: 'h-16 px-10 text-lg [&_svg]:size-5',
        icon: 'h-10 w-10 [&_svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
