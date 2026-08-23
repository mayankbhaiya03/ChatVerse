import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Hash, LogOut, MessageCircle, Search, Users, X } from 'lucide-react'
import { Avatar } from '../ui/Avatar.jsx'
import { OnlineUser } from './OnlineUser.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { useOnlineUsers } from '../../hooks/useOnlineUsers.js'

const TONE_CYCLE = ['violet', 'green', 'orange', 'pink', 'blue']

function Logo() {
  return (
    <Link to="/chat" className="text-white inline-flex items-center gap-2.5 font-heading font-bold text-lg no-underline tracking-[-0.3px]">
      <span className="w-8 h-8 grid place-items-center rounded-xl text-white bg-brand shadow-sm shadow-brand/30">
        <MessageCircle size={18} strokeWidth={2.5} />
      </span>
      <span>ChatVerse</span>
    </Link>
  )
}

export function Sidebar({ open, onClose, activeUser, onSelectUser }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { users, loading: usersLoading } = useOnlineUsers()
  const [searchQuery, setSearchQuery] = useState('')

  const username = user?.username || 'You'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSelectGroup = () => {
    onSelectUser(null)
  }

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <aside
      className={`w-[268px] shrink-0 flex flex-col py-5 px-3.5 text-[#d4dbea] bg-dark-sidebar border-r border-surface-sidebar-border max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:transition-transform max-md:duration-200 max-md:ease-out max-md:shadow-2xl ${
        open ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
      }`}
    >
      {/* Top Brand Header */}
      <div className="px-2 pb-2">
        <div className="flex items-center justify-between">
          <Logo />
          <button
            className="hidden max-md:inline-grid border-0 place-items-center text-muted-header bg-transparent p-1.5 rounded-lg hover:text-white"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Group Chat / General Channel Button */}
        <button
          onClick={handleSelectGroup}
          className={`w-full mt-4 py-2.5 px-3 rounded-xl flex gap-3 items-center text-left transition-colors ${
            activeUser === null
              ? 'bg-brand text-white shadow-sm shadow-brand/20'
              : 'bg-surface-chat/60 text-[#c8d0e0] hover:bg-surface-sidebar-hover'
          }`}
        >
          <span className={`w-7 h-7 grid place-items-center rounded-lg font-bold text-xs ${
            activeUser === null ? 'bg-white/20 text-white' : 'bg-surface-hover text-brand'
          }`}>
            <Hash size={15} strokeWidth={2.5} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate"># general</div>
            <div className={`text-[10px] truncate ${activeUser === null ? 'text-blue-100' : 'text-muted-time'}`}>Public group chat</div>
          </div>
          {activeUser === null && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        </button>
      </div>

      {/* Online Users Section */}
      <div className="mt-4 flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-muted-time text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
            <Users size={12} />
            <span>Online Users</span>
          </span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-online-count border border-emerald-500/20">
            {users.length}
          </span>
        </div>

        {/* Search input for online users */}
        <div className="px-2 mb-2">
          <div className="relative flex items-center">
            <Search size={13} className="absolute left-2.5 text-muted-time pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter online..."
              className="w-full bg-surface-chat/80 border border-muted-border/60 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-dark-text placeholder:text-muted-time/80 outline-none focus:border-brand/60"
            />
          </div>
        </div>

        {/* Users List with scroll */}
        <div className="flex-1 overflow-y-auto px-1 flex flex-col gap-1 pr-1.5">
          {usersLoading && (
            <div className="flex items-center gap-2 py-4 px-2 text-muted-time text-xs">
              <span className="w-3.5 h-3.5 border-2 border-brand/30 border-t-brand rounded-full animate-spin-fast" />
              <span>Checking online status...</span>
            </div>
          )}

          {!usersLoading && filteredUsers.length === 0 && (
            <div className="py-6 px-2 text-center text-muted-time text-xs">
              {searchQuery ? 'No online user matches search' : 'No other users online'}
            </div>
          )}

          {filteredUsers.map((u, idx) => (
            <OnlineUser
              key={u.id}
              initials={u.username.slice(0, 2).toUpperCase()}
              name={u.username}
              role={u.email}
              tone={TONE_CYCLE[idx % TONE_CYCLE.length]}
              active={activeUser === u.username}
              onClick={() => onSelectUser(u.username)}
            />
          ))}
        </div>
      </div>

      {/* User footer profile */}
      <div className="border-t border-surface-sidebar-border mt-3 pt-3 px-1">
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-surface-chat/40">
          <Avatar initials={username.slice(0, 2).toUpperCase()} tone="dark" small />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">{username}</div>
            <div className="text-[10px] text-muted-time flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-online animate-pulse" />
              <span>Online</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            className="p-1.5 text-muted-header hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            aria-label="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
