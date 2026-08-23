import client from './client.js'

export async function getConversation(withUser) {
  const { data } = await client.get('/api/messages/conversation', {
    params: { with: withUser },
  })
  return data
}

export async function getGroupMessages() {
  const { data } = await client.get('/api/messages/group')
  return data
}

export async function sendMessage(receiver, message) {
  const { data } = await client.post('/api/messages', { receiver, message })
  return data
}

export async function getAllMessages() {
  const { data } = await client.get('/api/messages')
  return data
}
