import { Avatar } from '../ui/Avatar.jsx'

export function MessageBubble({ message }) {
  return (
    <div
      className={`flex gap-3 max-w-[85%] max-md:max-w-[95%] animate-fade-in ${
        message.own ? 'self-end flex-row-reverse' : 'self-start'
      }`}
    >
      <div className="shrink-0 mt-0.5">
        <Avatar
          initials={message.initials}
          tone={message.own ? 'blue' : 'violet'}
          small
        />
      </div>

      <div className={`min-w-0 flex flex-col ${message.own ? 'items-end' : 'items-start'}`}>
        <div className={`flex gap-2 items-baseline mb-1 px-1 ${message.own ? 'flex-row-reverse' : ''}`}>
          <span className="text-xs font-semibold text-white/90">{message.sender}</span>
          <time className="text-[10px] text-muted-time">{message.time}</time>
        </div>

        <div
          className={`py-2.5 px-4 text-sm leading-relaxed rounded-2xl break-words max-w-full ${
            message.own
              ? 'bg-brand text-white rounded-tr-none shadow-sm shadow-brand/20'
              : 'bg-surface-msg text-[#d4dbea] border border-muted-border/80 rounded-tl-none'
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  )
}
