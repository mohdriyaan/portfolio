import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = {
  variant?: Variant
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`button button-${variant} ${className}`.trim()} {...props} />
}

type LinkButtonProps = {
  variant?: Variant
  className?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function LinkButton({ variant = 'primary', className = '', ...props }: LinkButtonProps) {
  return <a className={`button button-${variant} ${className}`.trim()} {...props} />
}
