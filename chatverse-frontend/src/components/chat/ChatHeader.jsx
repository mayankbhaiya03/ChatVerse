import { useEffect, useState } from 'react'
import { Bell, Hash, Menu, Search, User, Wifi } from 'lucide-react'

export function ChatHeader({ onMenu, onSearch, onNotify, channelName, channelDescription, isPrivate }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="min-h-[68px] border-b border-muted-border bg-surface-chat px-6 flex items-center gap-3 max-md:px-4 max-md:min-h-[60px]">
      <button
        className="hidden max-md:inline-grid mr-1 border-0 place-items-center text-muted-header bg-transparent p-1.5 rounded-lg hover:text-white hover:bg-surface-hover"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-surface-msg border border-muted-border grid place-items-center text-brand shrink-0">
          {isPrivate ? <User size={18} /> : <Hash size={18} />}
        </div>
        <div className="min-w-0">
          <div className="flex gap-2 items-center">
            <h2 className="m-0 text-white font-heading font-semibold text-base truncate">{channelName}</h2>
          </div>
          <p className="text-muted-time text-[11px] truncate max-w-md">{channelDescription}</p>
        </div>
      </div>

      <div className="ml-auto flex gap-2.5 items-center">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400 max-md:hidden">
          <Wifi size={12} />
          <span>TCP Live</span>
        </div>
        <time className="text-muted-time text-xs mr-1 max-md:hidden">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
        <button
          className="border-0 inline-grid place-items-center text-muted-header hover:text-white bg-transparent p-2 rounded-xl hover:bg-surface-hover transition-colors"
          onClick={onSearch}
          aria-label="Search messages"
        >
          <Search size={18} />
        </button>
        <button
          className="border-0 inline-grid place-items-center text-muted-header hover:text-white bg-transparent p-2 rounded-xl hover:bg-surface-hover transition-colors"
          onClick={onNotify}
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>
      </div>
    </header>
  )
}
