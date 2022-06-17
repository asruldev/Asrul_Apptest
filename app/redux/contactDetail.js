import { createSlice } from '@reduxjs/toolkit'

export const contactDetailSlice = createSlice({
  name: 'detail',
  initialState: {
    loading: false,
    error: "",
    detail: {},
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
    fetchContactDetail: (state, action) => {
      return {
        ...state,
        detail: action.payload
      }
    },
  },
})

export const { fetchContactDetail, setLoading, setError } = contactDetailSlice.actions

export default contactDetailSlice.reducer