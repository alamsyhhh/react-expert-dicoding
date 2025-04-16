import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const SECRET_KEY = 'login-token-secret'

const getToken = () => {
  const encryptedToken = Cookies.get('auth_token')
  if (!encryptedToken) return null
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export const createCommentAPI = async ({ threadId, content }) => {
  const token = getToken()
  const res = await fetch(
    `https://forum-api.dicoding.dev/v1/threads/${threadId}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    }
  )

  const result = await res.json()
  if (!res.ok) throw new Error(result.message || 'Gagal membuat komentar')
  return result.data.comment
}

export const voteCommentAPI = async ({ threadId, commentId, type }) => {
  const token = getToken()
  const url =
    type === 'up'
      ? `https://forum-api.dicoding.dev/v1/threads/${threadId}/comments/${commentId}/up-vote`
      : `https://forum-api.dicoding.dev/v1/threads/${threadId}/comments/${commentId}/down-vote`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()
  console.log('Vote response:', data)
  if (!res.ok) throw new Error(data.message || 'Gagal melakukan voting')

  return data.data.vote
}
