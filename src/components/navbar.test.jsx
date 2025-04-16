import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './navbar'
import Cookies from 'js-cookie'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Skenario 1: Navigasi ke halaman /leaderboard saat tombol "Leaderboard" diklik
  it('navigates to /leaderboard when Leaderboard button is clicked', () => {
    render(<Navbar />, { wrapper: MemoryRouter })

    // Mencari tombol "Leaderboard" dan klik
    const leaderboardBtn = screen.getByText('Leaderboard')
    fireEvent.click(leaderboardBtn)

    // Memastikan navigasi dipanggil dengan path "/leaderboard"
    expect(mockNavigate).toHaveBeenCalledWith('/leaderboard')
  })

  // Skenario 2: Logout akan menghapus token dan navigasi ke halaman utama
  it('removes auth_token and navigates to / when Logout button is clicked', () => {
    // Spy pada method Cookies.remove
    const removeSpy = vi.spyOn(Cookies, 'remove')

    render(<Navbar />, { wrapper: MemoryRouter })

    // Mencari tombol "Logout" dan klik
    const logoutBtn = screen.getByText('Logout')
    fireEvent.click(logoutBtn)

    // Memastikan token auth_token dihapus
    expect(removeSpy).toHaveBeenCalledWith('auth_token')
    // Memastikan navigasi ke halaman "/"
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
