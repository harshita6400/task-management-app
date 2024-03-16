import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskDataSlice from '../reduxSlice/taskDataSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
  taskDataSlice
})

const persistConfig = {
  key: 'task',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
