export const registerUserAPI = async (data) => {
  const res = await fetch('https://forum-api.dicoding.dev/v1/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Registration failed')
  }

  return result
}

export const loginUserAPI = async (data) => {
  const res = await fetch('https://forum-api.dicoding.dev/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Login failed')
  }

  return result
}

export const fetchUserProfileAPI = async (token) => {
  const res = await fetch('https://forum-api.dicoding.dev/v1/users/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch user profile')
  }

  return result
}
