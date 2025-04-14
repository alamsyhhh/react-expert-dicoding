import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUserAPI, loginUserAPI, fetchUserProfileAPI } from './authAPI'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'

const SECRET_KEY = 'login-token-secret'

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await registerUserAPI(formData)
      return response
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(formData)
      const token = response.data.token

      // Enkripsi token dan simpan ke cookie
      const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString()
      Cookies.set('auth_token', encryptedToken, { expires: 1 })

      return response
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const encryptedToken = Cookies.get('auth_token')
      const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY)
      const token = bytes.toString(CryptoJS.enc.Utf8)

      const response = await fetchUserProfileAPI(token)
      return response.data.user
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    successMessage: null,
    errorMessage: null,
    user: null
  },
  reducers: {
    resetMessages: (state) => {
      state.successMessage = null
      state.errorMessage = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.successMessage = null
        state.errorMessage = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
        state.successMessage = 'Register success!'
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.payload
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.successMessage = null
        state.errorMessage = null
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false
        state.successMessage = 'Login success!'
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.payload
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.payload
      })
  }
})

export const { resetMessages } = authSlice.actions
export default authSlice.reducer
