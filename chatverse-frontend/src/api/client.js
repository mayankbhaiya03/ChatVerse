import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
})

// Attach JWT to every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('chatverse_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-logout on 401
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('chatverse_token')
      localStorage.removeItem('chatverse_user')
      // Only redirect if not already on auth pages
      if (
        window.location.pathname !== '/' &&
        window.location.pathname !== '/register'
      ) {
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

export default client
