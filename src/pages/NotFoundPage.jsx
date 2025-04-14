const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen text-gray-800 bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="text-2xl">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="mt-4 text-lg">
          <a href="/" className="text-blue-500 hover:underline">
            Go back
          </a>
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
