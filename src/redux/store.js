import { configureStore, createSlice } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { nanoid } from 'nanoid';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
  },
  reducers: {
    add: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
            name,
            number,
            id: nanoid(),
          },
        };
      },
    },
    remove: {
      reducer(state, action) {
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
      },
    },
  },
});

const findSlice = createSlice({
  name: 'findContact',
  initialState: { filter: '' },
  reducers: {
    find: {
      reducer(state, action) {
        state.filter = action.payload;
      },
    },
  },
});

const persistConfig = {
  key: 'contact',
  storage,
};

const persistedReducer = persistReducer(persistConfig, contactSlice.reducer);

export const store = configureStore({
  reducer: {
    contacts: persistedReducer,
    filter: findSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const { add, remove } = contactSlice.actions;

export const { find } = findSlice.actions;

export const persistor = persistStore(store);
