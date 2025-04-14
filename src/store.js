import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import threadReducer from './features/thread/threadSlice'
import commentReducer from './features/comment/commentSlice'
import leaderboardReducer from './features/leaderboard/leaderboardSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const rootReducer = combineReducers({
  auth: authReducer,
  threads: threadReducer,
  comment: commentReducer,
  leaderboard: leaderboardReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER'
        ]
      }
    })
})

export const persistor = persistStore(store)
