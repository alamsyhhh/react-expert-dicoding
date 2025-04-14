export const getLeaderboardsAPI = async () => {
  const res = await fetch('https://forum-api.dicoding.dev/v1/leaderboards')
  const result = await res.json()
  if (!res.ok) { throw new Error(result.message || 'Gagal mengambil data leaderboard') }
  return result.data.leaderboards
}
