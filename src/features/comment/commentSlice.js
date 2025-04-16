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
    newComment: null,
    comments: []
  },
  reducers: {
    resetCommentState: (state) => {
      state.successMessage = null
      state.errorMessage = null
      state.newComment = null
    },
    voteCommentOptimistic: (state, action) => {
      const { commentId, userId, voteType } = action.payload
      const comment = state.newComment?.comments?.find(
        (c) => c.id === commentId
      )
      if (comment) {
        if (voteType === 'up') {
          comment.downVotesBy = comment.downVotesBy.filter(
            (id) => id !== userId
          )
          if (comment.upVotesBy.includes(userId)) {
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId)
          } else {
            comment.upVotesBy.push(userId)
          }
        } else if (voteType === 'down') {
          comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId)
          if (comment.downVotesBy.includes(userId)) {
            comment.downVotesBy = comment.downVotesBy.filter(
              (id) => id !== userId
            )
          } else {
            comment.downVotesBy.push(userId)
          }
        }
      }
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

export const { resetCommentState, voteCommentOptimistic } =
  commentSlice.actions
export default commentSlice.reducer
