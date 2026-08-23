import { useEffect, useRef, useState } from 'react'
import { Sidebar } from '../components/chat/Sidebar.jsx'
import { ChatHeader } from '../components/chat/ChatHeader.jsx'
import { MessageBubble } from '../components/chat/MessageBubble.jsx'
import { ChatInput } from '../components/chat/ChatInput.jsx'
import { SearchBar } from '../components/chat/SearchBar.jsx'
import { EmptyState } from '../components/chat/EmptyState.jsx'
import { Toast } from '../components/ui/Toast.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useMessages } from '../hooks/useMessages.js'

export function ChatPage() {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeUser, setActiveUser] = useState(null) // null = group chat
  const [toast, setToast] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const messagesEndRef = useRef(null)

  const { messages, loading, error, sendMessage } = useMessages(activeUser, user?.username)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const channelName = activeUser ? `@${activeUser}` : '#general'
  const channelDescription = activeUser
    ? `Private direct messages with ${activeUser}`
    : 'Public group messages for all online members'

  const visibleMessages = messages.filter(
    (msg) =>
      !query ||
      msg.text.toLowerCase().includes(query.toLowerCase()) ||
      msg.sender.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelectUser = (username) => {
    setActiveUser(username)
    setQuery('')
    setSearchOpen(false)
    setSidebarOpen(false) // close sidebar on mobile after selection
  }

  return (
    <main className="flex h-screen overflow-hidden bg-surface text-dark max-md:relative">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeUser={activeUser}
        onSelectUser={handleSelectUser}
      />

      <div className="min-w-0 flex-1 flex flex-col bg-surface-chat">
        <ChatHeader
          channelName={channelName}
          channelDescription={channelDescription}
          isPrivate={Boolean(activeUser)}
          onMenu={() => setSidebarOpen(true)}
          onSearch={() => setSearchOpen(!searchOpen)}
          onNotify={() => setToast('All messages are synced from Java TCP Socket server.')}
        />

        {searchOpen && (
          <SearchBar
            query={query}
            onChange={setQuery}
            onClose={() => { setQuery(''); setSearchOpen(false) }}
          />
        )}

        <section className="flex-1 overflow-y-auto p-6 max-md:p-4 flex flex-col justify-between">
          {loading && messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-time">
              <span className="w-6 h-6 border-2 border-brand/30 border-t-brand rounded-full animate-spin-fast" />
              <span className="text-xs">Fetching messages from MySQL...</span>
            </div>
          ) : error ? (
            <div className="p-4 my-6 text-center text-error bg-red-500/10 border border-red-500/20 rounded-xl text-xs">
              {error}
            </div>
          ) : visibleMessages.length === 0 ? (
            <EmptyState
              activeUser={activeUser}
              onSelectGroup={() => handleSelectUser(null)}
            />
          ) : (
            <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
              <div className="flex items-center gap-4 text-muted-time text-[11px] my-2">
                <span className="h-px flex-1 bg-muted-divider" />
                <span className="px-2 py-0.5 rounded-md bg-surface-msg text-muted-time border border-muted-border">
                  {activeUser ? `Direct Conversation with ${activeUser}` : 'General Channel History'}
                </span>
                <span className="h-px flex-1 bg-muted-divider" />
              </div>

              {visibleMessages.map((msg) => (
                <MessageBubble message={msg} key={msg.id} />
              ))}

              <div ref={messagesEndRef} />
            </div>
          )}
        </section>

        <ChatInput
          onSend={sendMessage}
          placeholder={activeUser ? `Message @${activeUser}...` : 'Send a message to #general...'}
        />

        {toast && <Toast message={toast} onClose={() => setToast('')} />}
      </div>
    </main>
  )
}
