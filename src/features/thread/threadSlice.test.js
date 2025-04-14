import reducer, { fetchAllThreads } from './threadSlice'

describe('threadSlice reducer', () => {
  // Skenario Pengujian 1: Reducer untuk fetchAllThreads.pending
  // Deskripsi: Menguji apakah state loading diubah menjadi true saat aksi fetchAllThreads.pending dipanggil.
  it('should handle fetchAllThreads.pending', () => {
    const initialState = {
      threads: [],
      users: [],
      loading: false,
      errorMessage: null,
      threadDetail: null,
      detailLoading: false,
      detailError: null
    }

    const nextState = reducer(initialState, fetchAllThreads.pending())
    expect(nextState.loading).toBe(true) // Verifikasi loading menjadi true
    expect(nextState.errorMessage).toBe(null) // Verifikasi errorMessage tetap null
  })

  // Skenario Pengujian 2: Reducer untuk fetchAllThreads.fulfilled
  // Deskripsi: Menguji apakah state threads diubah sesuai data yang diterima ketika aksi fetchAllThreads.fulfilled dipanggil.
  it('should handle fetchAllThreads.fulfilled', () => {
    const initialState = {
      threads: [],
      users: [],
      loading: true,
      errorMessage: null,
      threadDetail: null,
      detailLoading: false,
      detailError: null
    }

    const dummyThreads = [{ id: 1, title: 'Test thread' }]
    const nextState = reducer(
      initialState,
      fetchAllThreads.fulfilled(dummyThreads)
    )
    expect(nextState.threads).toEqual(dummyThreads) // Verifikasi data threads diubah sesuai data dummy
    expect(nextState.loading).toBe(false) // Verifikasi loading menjadi false setelah data diterima
  })
})
