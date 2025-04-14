import { describe, it, expect, vi } from 'vitest'
import reducer, { fetchAllThreads } from './threadSlice'
import * as api from './threadAPI'

describe('threadSlice reducer', () => {
  // Skenario Pengujian 1: Pengujian Thunk Function ketika fetchAllThreads berhasil
  // Deskripsi: Menguji apakah state threads diperbarui dengan data dari API ketika fetchAllThreads berhasil (fulfilled).
  it('should handle fetchAllThreads fulfilled', async () => {
    const dummyThreads = [{ id: 1, title: 'Test thread' }]

    // Mock fetchAllThreadsAPI untuk mengembalikan dummyThreads
    vi.spyOn(api, 'fetchAllThreadsAPI').mockResolvedValueOnce({
      data: { threads: dummyThreads }
    })

    // Jalankan thunk fetchAllThreads
    const action = await fetchAllThreads()(vi.fn(), vi.fn(), undefined)

    const initialState = {
      threads: [],
      users: [],
      loading: false,
      errorMessage: null,
      threadDetail: null,
      detailLoading: false,
      detailError: null
    }

    const nextState = reducer(initialState, action)

    expect(nextState.threads).toEqual(dummyThreads) // Verifikasi state threads diperbarui
    expect(nextState.loading).toBe(false) // Verifikasi loading menjadi false setelah data diterima
    expect(nextState.errorMessage).toBe(null) // Verifikasi errorMessage tetap null setelah berhasil
  })

  // Skenario Pengujian 2: Pengujian Thunk Function ketika fetchAllThreads gagal
  // Deskripsi: Menguji bagaimana state diubah ketika fetchAllThreads gagal (rejected).
  it('should handle fetchAllThreads rejected', async () => {
    vi.spyOn(api, 'fetchAllThreadsAPI').mockRejectedValueOnce(
      new Error('Network Error')
    )

    const thunkAPI = {
      rejectWithValue: vi.fn((value) => value)
    }

    const action = await fetchAllThreads()(vi.fn(), thunkAPI, undefined)

    const initialState = {
      threads: [],
      users: [],
      loading: false,
      errorMessage: null,
      threadDetail: null,
      detailLoading: false,
      detailError: null
    }

    const nextState = reducer(initialState, action)

    expect(nextState.loading).toBe(false) // Verifikasi loading menjadi false setelah gagal
    expect(nextState.errorMessage).toBe('Network Error') // Verifikasi errorMessage berisi pesan error
  })
})
