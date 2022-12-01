import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { orderModel } from 'entities/order';

import { watcherSaga } from 'app/store/rootSaga';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({ order: orderModel.reducer });

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat([sagaMiddleware]);
  },
});

sagaMiddleware.run(watcherSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
