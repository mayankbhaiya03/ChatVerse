import { useEffect } from 'react'
import { X } from 'lucide-react'

export function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2800)
    return () => clearTimeout(timer)
  }, [message, onClose])

  return (
    <div
      className="fixed right-6 bottom-6 z-50 flex items-center gap-3.5 py-3 pl-4 pr-3.5 border border-muted-border rounded-xl text-white bg-surface-msg shadow-2xl text-xs animate-toast-in max-md:right-3.5 max-md:bottom-3.5 max-md:left-3.5 max-md:justify-between"
      role="status"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="border-0 text-muted-time hover:text-white bg-transparent grid place-items-center p-1 rounded-lg"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  )
}
