import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createThread } from '../../features/thread/threadSlice'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Navbar from '../../components/navbar'
import LoadingBar from '../../components/loadingBar'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  body: yup.string().required('Body is required'),
  category: yup.string()
})

const CreateThreadPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const resultAction = await dispatch(createThread(data))

      if (createThread.fulfilled.match(resultAction)) {
        navigate('/threads')
      } else {
        throw new Error(resultAction.payload)
      }
    } catch (err) {
      alert(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      {isLoading && <LoadingBar />}
      <div className="max-w-2xl px-6 py-8 mx-auto mt-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          ✨ Create a New Thread
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter thread title"
              {...register('title')}
              className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Body
            </label>
            <textarea
              placeholder="Write your thread content here..."
              rows={6}
              {...register('body')}
              className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
            {errors.body && (
              <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Category (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter category"
              {...register('category')}
              className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
            disabled={isLoading}
          >
            🚀 Submit Thread
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateThreadPage
