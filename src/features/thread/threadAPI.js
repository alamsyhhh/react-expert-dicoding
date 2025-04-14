import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const SECRET_KEY = 'login-token-secret'

const getToken = () => {
  const encryptedToken = Cookies.get('auth_token')
  if (!encryptedToken) return null
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export const fetchAllThreadsAPI = async () => {
  const res = await fetch('https://forum-api.dicoding.dev/v1/threads')

  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch threads')
  }

  return result
}

export const fetchAllUsersAPI = async () => {
  const res = await fetch('https://forum-api.dicoding.dev/v1/users')
  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch users')
  }
  return result.data.users
}

export const fetchThreadDetailAPI = async (id) => {
  const res = await fetch(`https://forum-api.dicoding.dev/v1/threads/${id}`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Gagal memuat detail')
  return data.data.detailThread
}

export const createThreadAPI = async ({ title, body, category }) => {
  const token = getToken()

  if (!token) {
    throw new Error('Unauthorized')
  }

  const res = await fetch('https://forum-api.dicoding.dev/v1/threads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, body, category })
  })

  const result = await res.json()
  if (!res.ok) throw new Error(result.message || 'Gagal membuat thread')
  return result.data
}

export const upVoteThreadAPI = async ({ threadId }) => {
  const token = getToken()
  const res = await fetch(
    `https://forum-api.dicoding.dev/v1/threads/${threadId}/up-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  const result = await res.json()
  if (!res.ok) throw new Error(result.message || 'Gagal melakukan upvote')
  return result.data
}

export const downVoteThreadAPI = async ({ threadId }) => {
  const token = getToken()
  const res = await fetch(
    `https://forum-api.dicoding.dev/v1/threads/${threadId}/down-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  const result = await res.json()
  if (!res.ok) throw new Error(result.message || 'Gagal melakukan downvote')
  return result.data
}
