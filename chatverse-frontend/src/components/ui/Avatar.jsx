const toneClasses = {
  violet: 'bg-avatar-violet',
  green: 'bg-avatar-green',
  orange: 'bg-avatar-orange',
  pink: 'bg-avatar-pink',
  dark: 'bg-avatar-dark',
  blue: 'bg-avatar-blue',
}

export function Avatar({ initials, tone = 'blue', small = false }) {
  const sizeClasses = small
    ? 'w-[30px] h-[30px] rounded-[9px] text-[9px]'
    : 'w-9 h-9 rounded-[11px] text-[11px]'

  return (
    <span
      className={`inline-grid place-items-center shrink-0 text-white font-bold ${sizeClasses} ${toneClasses[tone] || toneClasses.blue}`}
    >
      {initials}
    </span>
  )
}
