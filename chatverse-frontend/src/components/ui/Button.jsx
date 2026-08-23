export function Button({ children, variant = 'primary', type = 'button', ...props }) {
  const base =
    'border-0 rounded-[10px] min-h-[47px] px-[18px] inline-flex items-center justify-center gap-[9px] font-bold transition-all duration-200'

  const variants = {
    primary:
      'text-white bg-brand shadow-[0_6px_14px_var(--color-brand-glow)] hover:not-disabled:bg-brand-hover hover:not-disabled:-translate-y-px hover:not-disabled:shadow-[0_9px_18px_var(--color-brand-glow-lg)] disabled:cursor-not-allowed disabled:opacity-55',
  }

  return (
    <button type={type} className={`${base} ${variants[variant] || ''}`} {...props}>
      {children}
    </button>
  )
}
