import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const SECRET_KEY = 'login-token-secret'

const isAuthenticated = () => {
  const encryptedToken = Cookies.get('auth_token')
  if (!encryptedToken) return false

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY)
    const token = bytes.toString(CryptoJS.enc.Utf8)

    if (!token) return false

    return true
  } catch (error) {
    console.log('Error decrypting token:', error)
    return false
  }
}

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
