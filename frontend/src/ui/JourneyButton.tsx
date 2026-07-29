import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface JourneyButtonProps extends PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> {
  awakened: boolean
}

export function JourneyButton({ awakened, children, ...props }: JourneyButtonProps) {
  return (
    <button className="journey-button" type="button" aria-pressed={awakened} {...props}>
      <span>{children}</span>
      <span className="button-light" aria-hidden="true" />
    </button>
  )
}
