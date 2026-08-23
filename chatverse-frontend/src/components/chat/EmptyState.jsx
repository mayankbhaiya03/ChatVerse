import { MessageSquare, Users, ShieldCheck } from 'lucide-react'

export function EmptyState({ activeUser }) {
  if (activeUser) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 my-auto animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-brand/10 text-brand grid place-items-center mb-4 border border-brand/20 shadow-inner">
          <MessageSquare size={26} />
        </div>
        <h3 className="text-base font-heading font-semibold text-white mb-1">
          Start conversation with @{activeUser}
        </h3>
        <p className="text-xs text-muted-time max-w-sm">
          Messages sent here are transmitted through the Java TCP socket server and saved to MySQL.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 my-auto animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand grid place-items-center mb-4 border border-brand/20 shadow-inner">
        <Users size={30} />
      </div>
      <h3 className="text-lg font-heading font-semibold text-white mb-1">
        Welcome to #general
      </h3>
      <p className="text-xs text-muted-time max-w-sm mb-4">
        Broadcast messages to all connected workspace members via the TCP chat server.
      </p>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-msg border border-muted-border text-[11px] text-muted-header">
        <ShieldCheck size={13} className="text-emerald-400" />
        <span>TCP Chat Server Connected</span>
      </div>
    </div>
  )
}
