import { createSlice } from '@reduxjs/toolkit'

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    loading: false,
    error: "",
    list: [],
  },
  reducers: {
    setLoading: (state) => {
      return {
        ...state,
        loading: !state.loading
      }
    },
    setError: (state, action) => {
      return {
        ...state,
        error: action.payload
      }
    },
    fetchContact: (state, action) => {
      return {
        ...state,
        list: action.payload
      }
    },
  },
})

export const { fetchContact, setLoading, setError } = contactSlice.actions

export default contactSlice.reducer