import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import LoadingBar from './loadingBar'

describe('LoadingBar', () => {
  // Skenario 1: Menampilkan loading bar dan progress bar
  it('renders the loading bar and progress bar', () => {
    render(<LoadingBar />)

    // Mengambil elemen berdasarkan data-testid
    const loadingBar = screen.getByTestId('loading-bar')
    const progressBar = screen.getByTestId('progress-bar')

    // Memastikan elemen loadingBar dan progressBar muncul di dokumen
    expect(loadingBar).toBeInTheDocument()
    expect(progressBar).toBeInTheDocument()
  })
})
