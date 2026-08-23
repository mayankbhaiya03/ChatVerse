import { useState } from 'react'
import { Send, Smile } from 'lucide-react'

export function ChatInput({ onSend, placeholder }) {
  const [value, setValue] = useState('')

  const send = (e) => {
    if (e) e.preventDefault()
    if (value.trim()) {
      onSend(value.trim())
      setValue('')
    }
  }

  return (
    <div className="p-4 bg-surface-chat border-t border-muted-border max-md:p-3">
      <form
        onSubmit={send}
        className="max-w-4xl mx-auto flex items-center gap-2 bg-surface-input border border-muted-border rounded-2xl px-4 py-2 focus-within:border-brand/60 focus-within:shadow-[0_0_0_3px_var(--color-brand-subtle)] transition-all"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder || 'Write a message...'}
          className="flex-1 bg-transparent text-sm text-white placeholder:text-muted-time outline-none"
        />

        <button
          type="button"
          onClick={() => setValue((prev) => `${prev} :)`)}
          className="p-1.5 text-muted-time hover:text-white rounded-lg transition-colors"
          aria-label="Add emoji"
        >
          <Smile size={18} />
        </button>

        <button
          type="submit"
          disabled={!value.trim()}
          className="p-2 rounded-xl bg-brand text-white hover:bg-brand-hover disabled:opacity-40 disabled:hover:bg-brand transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm shadow-brand/30"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
