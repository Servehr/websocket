import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import storage from 'redux-persist/lib/storage'
import * as toolkit from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { storeReducer } from './reducer';

const reducers = toolkit.combineReducers(
  {
    auth: authSlice,
  }
)

const persistConfig = {
  key: 'root',
  storage: sessionStorage
}

const rootReducer = (state: any, action: { type: string; }) => 
{
    if(action.type === 'RESET')
    {
        storage.removeItem('persist:root');
        state = {};
    }
    return reducers(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = toolkit.configureStore({
  reducer: persistedReducer,
  devTools: { trace: true, traceLimit: 25 },
  middleware: [
    ...toolkit.getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  ]
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
// export const persistor = persistStore(store);
// export default store