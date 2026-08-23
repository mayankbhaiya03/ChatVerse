import { Search, X } from 'lucide-react'

export function SearchBar({ query, onChange, onClose }) {
  return (
    <div className="w-[min(480px,calc(100%-32px))] mx-auto my-2 py-2 px-3 border border-muted-border bg-surface-msg rounded-xl flex items-center gap-2.5 text-muted-header shadow-lg animate-slide-up">
      <Search size={16} className="text-muted-time shrink-0" />
      <input
        autoFocus
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filter messages in this conversation..."
        className="min-w-0 flex-1 border-0 outline-0 text-white text-xs bg-transparent placeholder:text-muted-time"
      />
      {query && (
        <button
          onClick={() => onChange('')}
          className="border-0 text-muted-time hover:text-white bg-transparent p-0.5 text-xs"
        >
          Clear
        </button>
      )}
      <button
        onClick={onClose}
        className="border-0 text-muted-time hover:text-white bg-transparent grid place-items-center p-1 rounded-lg"
        aria-label="Close search"
      >
        <X size={15} />
      </button>
    </div>
  )
}
