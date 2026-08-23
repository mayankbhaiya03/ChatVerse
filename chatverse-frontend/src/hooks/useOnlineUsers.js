import { useEffect, useState } from 'react'
import { getAllUsers } from '../api/users.js'

const POLL_INTERVAL = 2000

/**
 * Hook for fetching online users with periodic polling.
 * Polls every 2 seconds for responsive online/offline status.
 */
export function useOnlineUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await getAllUsers()
        if (!cancelled) {
          setUsers(data)
          setError(null)
        }
      } catch {
        if (!cancelled) setError('Failed to load users.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    const interval = setInterval(() => {
      if (!cancelled) load()
    }, POLL_INTERVAL)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return { users, loading, error }
}
