import { Avatar } from '../ui/Avatar.jsx'

export function OnlineUser({ initials, name, role, tone, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`w-full border-0 rounded-xl py-2 px-2.5 flex gap-2.5 items-center text-left transition-all duration-150 group ${
        active
          ? 'bg-brand text-white shadow-sm shadow-brand/20'
          : 'text-[#d0d6e2] hover:bg-surface-sidebar-hover hover:text-white'
      }`}
    >
      <div className="relative shrink-0">
        <Avatar initials={initials} tone={tone} small />
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-online-dot border-2 border-dark-sidebar" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold truncate group-hover:text-white">{name}</div>
        {role && (
          <div className={`text-[10px] truncate ${active ? 'text-blue-100' : 'text-muted-time'}`}>
            {role}
          </div>
        )}
      </div>
    </button>
  )
}
