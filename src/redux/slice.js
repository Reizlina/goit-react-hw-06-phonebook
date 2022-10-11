import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    add: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare({ name, number }) {
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
    find: {
      reducer(state, action) {
        state.filter = action.payload;
      },
    },
  },
});

export const contactReducer = contactSlice.reducer;

export const { add, remove, find } = contactSlice.actions;
