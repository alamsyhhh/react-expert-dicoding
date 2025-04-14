import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderboards } from '../../features/leaderboard/leaderboardSlice'
import Navbar from '../../components/navbar'
import LoadingBar from '../../components/loadingBar'

const LeaderboardPage = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.leaderboard)

  useEffect(() => {
    dispatch(fetchLeaderboards())
  }, [dispatch])

  return (
    <>
      <Navbar />
      {loading && <LoadingBar />}

      <div className="max-w-4xl px-6 py-8 mx-auto mt-4 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          🏆 Leaderboard
        </h1>

        {error && <p className="text-red-500">Error: {error}</p>}

        <ul className="space-y-4">
          {data.map(({ user, score }) => (
            <li
              key={user.id}
              className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 mr-4 rounded-full"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{score}</p>
                <p className="text-xs text-gray-400">poin</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default LeaderboardPage
