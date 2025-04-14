import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('auth_token')

    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 border-b shadow-md bg-white/80 backdrop-blur-md">
      <div className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-500"
          onClick={() => navigate('/threads')}
        >
          💬 Forum App
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/leaderboard')}
            className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Leaderboard
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
