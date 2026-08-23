import { useCallback, useEffect, useRef, useState } from 'react'
import { getConversation, getGroupMessages, sendMessage as sendMessageApi } from '../api/messages.js'

const POLL_INTERVAL = 1000

/**
 * Hook for message management with polling.
 * Polls every 1 second for near-real-time message updates.
 *
 * @param {string|null} activeUser - The username to load conversation with, or null for group chat
 * @param {string|null} currentUsername - The logged-in user's username
 */
export function useMessages(activeUser, currentUsername) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const pollRef = useRef(null)

  const fetchMessages = useCallback(async () => {
    try {
      let data
      if (activeUser) {
        data = await getConversation(activeUser)
      } else {
        data = await getGroupMessages()
      }
      setMessages(data || [])
      setError(null)
    } catch {
      setError('Failed to load messages.')
    }
  }, [activeUser])

  // Initial load + polling
  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      try {
        let data
        if (activeUser) {
          data = await getConversation(activeUser)
        } else {
          data = await getGroupMessages()
        }
        if (!cancelled) {
          setMessages(data || [])
          setError(null)
        }
      } catch {
        if (!cancelled) setError('Failed to load messages.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    // Start polling
    pollRef.current = setInterval(() => {
      if (!cancelled) fetchMessages()
    }, POLL_INTERVAL)

    return () => {
      cancelled = true
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [activeUser, fetchMessages])

  const sendMessage = useCallback(
    async (text) => {
      const receiver = activeUser || 'GROUP'
      try {
        await sendMessageApi(receiver, text)
        // Refresh conversation immediately from MySQL persistence
        await fetchMessages()
      } catch {
        setError('Failed to send message.')
      }
    },
    [activeUser, fetchMessages]
  )

  // Transform backend messages to the format UI components expect
  const formattedMessages = messages.map((msg) => ({
    id: msg.id,
    sender: msg.sender,
    initials: msg.sender ? msg.sender.slice(0, 2).toUpperCase() : '??',
    text: msg.message,
    time: msg.timestamp
      ? new Date(msg.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '',
    own: msg.sender === currentUsername,
  }))

  return { messages: formattedMessages, loading, error, sendMessage, refreshMessages: fetchMessages }
}
