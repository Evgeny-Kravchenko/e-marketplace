import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { orderModel } from 'entities/order';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({ order: orderModel.reducer });

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
