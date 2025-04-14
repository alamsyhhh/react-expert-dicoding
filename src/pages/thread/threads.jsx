import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllThreads,
  fetchAllUsers
} from '../../features/thread/threadSlice'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar'
import LoadingBar from '../../components/loadingBar'

const ThreadListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { threads, users, loading, errorMessage } = useSelector(
    (state) => state.threads
  )

  useEffect(() => {
    dispatch(fetchAllThreads())
    dispatch(fetchAllUsers())
  }, [dispatch])

  const formatDate = (isoString) => {
    return new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(isoString))
  }

  const getUserInfo = (userId) => {
    return users.find((user) => user.id === userId)
  }

  return (
    <>
      <Navbar />
      {loading && <LoadingBar />}

      <div className="max-w-5xl px-4 py-10 mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-gray-900">🧵 Threads</h1>
          <button
            onClick={() => navigate('/threads/create')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            + Buat Thread
          </button>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="grid grid-cols-1 gap-6">
          {threads.map((thread) => {
            const user = getUserInfo(thread.ownerId)
            return (
              <div
                key={thread.id}
                onClick={() => navigate(`/threads/${thread.id}`)}
                className="p-6 transition duration-200 bg-white border border-gray-200 shadow-sm cursor-pointer rounded-2xl hover:shadow-md hover:border-blue-300 group"
              >
                <h2 className="text-2xl font-semibold text-blue-700 group-hover:underline">
                  {thread.title}
                </h2>

                <div
                  className="mt-3 text-sm leading-relaxed text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html:
                      thread.body.length > 200
                        ? thread.body.substring(0, 200) + '...'
                        : thread.body
                  }}
                ></div>

                <div className="flex items-center justify-between pt-4 mt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    {user
                      ? (
                      <>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(thread.createdAt)}
                          </p>
                        </div>
                      </>
                        )
                      : (
                      <div>
                        <p className="text-sm text-gray-500">Unknown User</p>
                        <p className="text-xs text-gray-400">
                          {formatDate(thread.createdAt)}
                        </p>
                      </div>
                        )}
                  </div>
                  <div className="text-sm text-gray-500">
                    💬 {thread.totalComments} komentar
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ThreadListPage
