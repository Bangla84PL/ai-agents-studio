import * as React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button variants following SmartCampAI branding guide
 *
 * Variants:
 * - default: White background with forest green text
 * - jungle: Jungle background with dark overlay
 * - outline: Transparent with white border
 * - ghost: Transparent, no border
 * - emerald: Emerald green background
 * - destructive: Red background for dangerous actions
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-white text-forest-green hover:bg-white/90 active:scale-[0.98]',
        jungle:
          'relative text-white border border-white/30 shadow-md hover:opacity-90 active:scale-[0.98] jungle-button',
        outline:
          'bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50',
        ghost: 'bg-transparent text-white hover:bg-white/10',
        emerald:
          'bg-emerald-500 text-white shadow-[0_4px_6px_-1px_rgba(16,185,129,0.3)] hover:bg-emerald-600 hover:shadow-[0_6px_8px_-1px_rgba(16,185,129,0.4)] active:scale-[0.98]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-11 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
