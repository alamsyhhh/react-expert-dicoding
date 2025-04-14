import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchThreadDetail,
  upVoteThread,
  downVoteThread
} from '../../features/thread/threadSlice'
import { useForm } from 'react-hook-form'
import {
  createComment,
  voteComment
} from '../../features/comment/commentSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike
} from 'react-icons/ai'
import Navbar from '../../components/navbar'
import LoadingBar from '../../components/loadingBar'

const schema = yup.object().shape({
  content: yup.string().required('Komentar tidak boleh kosong')
})

const ThreadDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { threadDetail, detailLoading, detailError } = useSelector(
    (state) => state.threads
  )
  const { user } = useSelector((state) => state.auth)
  const authUser = user
  const { loading: commentLoading, errorMessage: commentError } = useSelector(
    (state) => state.comment
  )

  useEffect(() => {
    dispatch(fetchThreadDetail(id))
  }, [id, dispatch])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    await dispatch(createComment({ threadId: id, content: data.content }))
    reset()
    dispatch(fetchThreadDetail(id))
  }

  const formatDate = (isoString) =>
    new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(isoString))

  const onVoteComment = async (commentId, type) => {
    if (!authUser) return alert('Harap login terlebih dahulu!')
    await dispatch(
      voteComment({ threadId: id, commentId, type, token: authUser.token })
    )
    dispatch(fetchThreadDetail(id))
  }

  const handleVoteThread = async (type) => {
    if (!authUser) return alert('Harap login terlebih dahulu!')
    if (type === 'up') {
      await dispatch(upVoteThread({ threadId: id, token: authUser.token }))
    } else {
      await dispatch(downVoteThread({ threadId: id, token: authUser.token }))
    }
    dispatch(fetchThreadDetail(id))
  }

  const isVoted = (list) => authUser && list.includes(authUser.id)

  if (detailLoading) {
    return (
      <>
        <LoadingBar />
      </>
    )
  }

  if (detailError) {
    return (
      <p className="p-4 text-sm text-red-500">
        Terjadi kesalahan: {detailError}
      </p>
    )
  }

  if (!threadDetail) {
    return <p className="p-4 text-sm">Thread tidak ditemukan.</p>
  }

  const thread = threadDetail

  return (
    <>
      <Navbar />

      {(commentLoading || detailLoading) && <LoadingBar />}

      <div className="max-w-3xl px-4 py-8 mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">{thread.title}</h1>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          {thread.owner?.avatar && (
            <img
              src={thread.owner.avatar}
              alt={thread.owner.name}
              className="object-cover rounded-full w-7 h-7"
            />
          )}
          <span>{thread.owner?.name}</span>
          <span>•</span>
          <span>{formatDate(thread.createdAt)}</span>
        </div>

        <div
          className="prose-sm prose text-gray-800 prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: thread.body }}
        />

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => handleVoteThread('up')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition ${
              isVoted(thread.upVotesBy)
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-blue-50 text-gray-600'
            }`}
          >
            {isVoted(thread.upVotesBy) ? <AiFillLike /> : <AiOutlineLike />}
            <span>{thread.upVotesBy.length}</span>
          </button>
          <button
            onClick={() => handleVoteThread('down')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition ${
              isVoted(thread.downVotesBy)
                ? 'bg-red-100 text-red-600'
                : 'hover:bg-red-50 text-gray-600'
            }`}
          >
            {isVoted(thread.downVotesBy)
              ? (
              <AiFillDislike />
                )
              : (
              <AiOutlineDislike />
                )}
            <span>{thread.downVotesBy.length}</span>
          </button>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Tambahkan Komentar
          </h3>
          {commentError && (
            <p className="mb-2 text-sm text-red-500">{commentError}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <textarea
              {...register('content')}
              placeholder="Tulis komentar kamu..."
              className="w-full p-3 text-sm border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
            <button
              type="submit"
              disabled={commentLoading}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {commentLoading ? 'Mengirim...' : 'Kirim Komentar'}
            </button>
          </form>
        </div>

        <div className="pt-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Komentar ({thread.comments.length})
          </h2>

          <div className="space-y-4">
            {thread.comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
              >
                <div className="flex items-center mb-1 space-x-2 text-sm text-gray-500">
                  {comment.owner?.avatar && (
                    <img
                      src={comment.owner.avatar}
                      alt={comment.owner.name}
                      className="object-cover w-6 h-6 rounded-full"
                    />
                  )}
                  <span>{comment.owner?.name}</span>
                  <span>•</span>
                  <span>{formatDate(comment.createdAt)}</span>
                </div>
                <div
                  className="text-sm text-gray-800"
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                />
                <div className="flex items-center gap-3 mt-2 text-sm">
                  <button
                    onClick={() => onVoteComment(comment.id, 'up')}
                    className={`flex items-center gap-1 transition rounded-full px-2 py-1 ${
                      isVoted(comment.upVotesBy)
                        ? 'bg-blue-100 text-blue-600'
                        : 'hover:bg-blue-50 text-gray-600'
                    }`}
                  >
                    {isVoted(comment.upVotesBy)
                      ? (
                      <AiFillLike />
                        )
                      : (
                      <AiOutlineLike />
                        )}
                    <span>{comment.upVotesBy.length}</span>
                  </button>
                  <button
                    onClick={() => onVoteComment(comment.id, 'down')}
                    className={`flex items-center gap-1 transition rounded-full px-2 py-1 ${
                      isVoted(comment.downVotesBy)
                        ? 'bg-red-100 text-red-600'
                        : 'hover:bg-red-50 text-gray-600'
                    }`}
                  >
                    {isVoted(comment.downVotesBy)
                      ? (
                      <AiFillDislike />
                        )
                      : (
                      <AiOutlineDislike />
                        )}
                    <span>{comment.downVotesBy.length}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ThreadDetailPage
