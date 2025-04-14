import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/auth/register'
import LoginPage from './pages/auth/login'
import ThreadListPage from './pages/thread/threads'
import ThreadDetailPage from './pages/thread/threadById'
import CreateThreadPage from './pages/thread/create'
import LeaderboardPage from './pages/leaderboard'
import PrivateRoute from './helpers/PrivateRoute'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/threads" element={<ThreadListPage />} />
            <Route path="/threads/create" element={<CreateThreadPage />} />
            <Route path="/threads/:id" element={<ThreadDetailPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
