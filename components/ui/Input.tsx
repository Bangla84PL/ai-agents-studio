import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/70 transition-all duration-200',
            'focus:outline-none focus:border-2 focus:border-white/50 focus:bg-white/15',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'backdrop-blur-sm',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
