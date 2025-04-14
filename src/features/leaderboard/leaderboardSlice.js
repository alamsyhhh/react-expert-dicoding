import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getLeaderboardsAPI } from './leaderboardAPI'

export const fetchLeaderboards = createAsyncThunk(
  'leaderboard/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getLeaderboardsAPI()
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    loading: false,
    data: [],
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default leaderboardSlice.reducer
