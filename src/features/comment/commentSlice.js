import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createCommentAPI, voteCommentAPI } from './commentAPI'

export const createComment = createAsyncThunk(
  'comment/create',
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      const data = await createCommentAPI({ threadId, content })
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const voteComment = createAsyncThunk(
  'comment/voteComment',
  async ({ threadId, commentId, type, token }, { rejectWithValue }) => {
    try {
      return await voteCommentAPI({ threadId, commentId, type, token })
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    loading: false,
    successMessage: null,
    errorMessage: null,
    newComment: null
  },
  reducers: {
    resetCommentState: (state) => {
      state.successMessage = null
      state.errorMessage = null
      state.newComment = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true
        state.errorMessage = null
        state.successMessage = null
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = 'Komentar berhasil dikirim!'
        state.newComment = action.payload
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.payload
      })
  }
})

export const { resetCommentState } = commentSlice.actions
export default commentSlice.reducer
