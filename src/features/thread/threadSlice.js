import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchAllThreadsAPI,
  fetchAllUsersAPI,
  fetchThreadDetailAPI,
  createThreadAPI,
  upVoteThreadAPI,
  downVoteThreadAPI
} from './threadAPI'

export const fetchAllThreads = createAsyncThunk(
  'threads/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllThreadsAPI()
      return response.data.threads
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const users = await fetchAllUsersAPI()
      return users
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchThreadDetail = createAsyncThunk(
  'threads/fetchDetail',
  async (id, { rejectWithValue }) => {
    try {
      const thread = await fetchThreadDetailAPI(id)
      return thread
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const createThread = createAsyncThunk(
  'threads/create',
  async ({ title, body, category, token }, { rejectWithValue }) => {
    try {
      const data = await createThreadAPI({ title, body, category, token })
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const upVoteThread = createAsyncThunk(
  'threads/upVote',
  async ({ threadId, token }, { rejectWithValue }) => {
    try {
      return await upVoteThreadAPI({ threadId, token })
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const downVoteThread = createAsyncThunk(
  'threads/downVote',
  async ({ threadId, token }, { rejectWithValue }) => {
    try {
      return await downVoteThreadAPI({ threadId, token })
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const threadSlice = createSlice({
  name: 'threads',
  initialState: {
    threads: [],
    users: [],
    loading: false,
    errorMessage: null,
    threadDetail: null,
    detailLoading: false,
    detailError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllThreads.pending, (state) => {
        state.loading = true
        state.errorMessage = null
      })
      .addCase(fetchAllThreads.fulfilled, (state, action) => {
        state.loading = false
        state.threads = action.payload
      })
      .addCase(fetchAllThreads.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.payload
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })

      .addCase(createThread.pending, (state) => {
        state.loading = true
        state.errorMessage = null
      })
      .addCase(createThread.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createThread.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.payload
      })

      .addCase(fetchThreadDetail.pending, (state) => {
        state.detailLoading = true
        state.detailError = null
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.detailLoading = false
        state.threadDetail = action.payload
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.detailLoading = false
        state.detailError = action.payload
      })
  }
})

export default threadSlice.reducer
