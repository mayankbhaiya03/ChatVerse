import client from './client.js'

export async function getMe() {
  const { data } = await client.get('/api/users/me')
  return data
}

export async function getAllUsers() {
  const { data } = await client.get('/api/users/online')
  return data
}
