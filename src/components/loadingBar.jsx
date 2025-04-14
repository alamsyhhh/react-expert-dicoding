import React from 'react'

const LoadingBar = () => {
  return (
    <div className="w-full h-1 bg-gray-200" data-testid="loading-bar">
      <div
        className="w-1/3 h-full bg-blue-600 animate-pulse"
        data-testid="progress-bar"
      ></div>
    </div>
  )
}

export default LoadingBar
