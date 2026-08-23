export function AuthField({ label, ...props }) {
  return (
    <label className="flex flex-col gap-[7px] text-muted text-xs font-semibold">
      <span>{label}</span>
      <input
        className="h-12 px-[15px] border border-muted-border text-white bg-surface-msg rounded-[10px] outline-0 transition-all duration-200 focus:border-brand focus:shadow-[0_0_0_3px_var(--color-brand-subtle)] placeholder:text-muted-time"
        {...props}
      />
    </label>
  )
}
