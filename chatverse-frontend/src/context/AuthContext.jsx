import { useCallback, useEffect, useState } from 'react'
import { getMe } from '../api/users.js'
import { logoutApi } from '../api/auth.js'
import { AuthContext } from './authContextInstance.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('chatverse_token'))
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('chatverse_token')))

  const isAuthenticated = !!token && !!user

  // Hydrate user from token on mount
  useEffect(() => {
    if (!token) {
      return
    }

    let cancelled = false

    getMe()
      .then((userData) => {
        if (!cancelled) setUser(userData)
      })
      .catch(() => {
        // Token is invalid — clear it
        if (!cancelled) {
          localStorage.removeItem('chatverse_token')
          localStorage.removeItem('chatverse_user')
          setToken(null)
          setUser(null)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [token])

  const login = useCallback(async (newToken, username) => {
    localStorage.setItem('chatverse_token', newToken)
    localStorage.setItem('chatverse_user', username)
    setToken(newToken)
  }, [])

  const logout = useCallback(async () => {
    await logoutApi()
    localStorage.removeItem('chatverse_token')
    localStorage.removeItem('chatverse_user')
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
