import client from './client.js'

function getError(error) {
  return (
    error.response?.data?.message ||
    error.response?.data ||
    'Something went wrong. Please try again.'
  )
}

export async function login(credentials) {
  try {
    const { data } = await client.post('/api/auth/login', credentials)
    return data
  } catch (error) {
    throw new Error(getError(error), { cause: error })
  }
}

export async function register(details) {
  try {
    const { data } = await client.post('/api/auth/register', details)
    return data
  } catch (error) {
    throw new Error(getError(error), { cause: error })
  }
}

export async function logoutApi() {
  try {
    await client.post('/api/auth/logout')
  } catch {
    // ignore network errors on logout
  }
}
