import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  loginUser,
  resetMessages,
  fetchUserProfile
} from '../../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup.string().required('Password is required')
})

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  )

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    dispatch(loginUser(data)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(fetchUserProfile()).then((res2) => {
          if (res2.meta.requestStatus === 'fulfilled') {
            navigate('/threads')
          } else {
            setError('password', {
              type: 'manual',
              message: 'Gagal mengambil profil user'
            })
          }
        })
      } else {
        setError('password', { type: 'manual', message: res.payload })
      }
    })
  }

  useEffect(() => {
    return () => {
      dispatch(resetMessages())
    }
  }, [dispatch])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-3xl">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
          Welcome Back 👋
        </h2>

        {successMessage && (
          <div className="px-4 py-3 mb-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded-md">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="px-4 py-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              className={`w-full px-4 py-2.5 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 text-sm ${
                errors.email
                  ? 'border-red-500 ring-red-300'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              className={`w-full px-4 py-2.5 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 text-sm ${
                errors.password
                  ? 'border-red-500 ring-red-300'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Register here
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-medium text-white transition duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
