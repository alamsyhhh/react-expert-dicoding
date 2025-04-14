import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { registerUser, resetMessages } from '../../features/auth/authSlice'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6).required('Password is required')
})

const RegisterPage = () => {
  const dispatch = useDispatch()
  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    dispatch(registerUser(data)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        reset()
      }
    })
  }

  useEffect(() => {
    return () => {
      dispatch(resetMessages())
    }
  }, [dispatch])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-3xl">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
          Create Account ✨
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
              Name
            </label>
            <input
              {...register('name')}
              className={`w-full px-4 py-2.5 border rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-red-500 ring-red-300'
                  : 'border-gray-300 focus:ring-indigo-500'
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              className={`w-full px-4 py-2.5 border rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 ring-red-300'
                  : 'border-gray-300 focus:ring-indigo-500'
              }`}
              placeholder="example@mail.com"
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
              className={`w-full px-4 py-2.5 border rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 ${
                errors.password
                  ? 'border-red-500 ring-red-300'
                  : 'border-gray-300 focus:ring-indigo-500'
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
            Already have an account?{' '}
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:underline"
            >
              Login here
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-medium text-white transition duration-200 bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
