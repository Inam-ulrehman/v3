import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'

const initialState = {
  isLoading: false,
  isSideBarOpen: false,
  user: getUserFromLocalStorage(),
}

// Hold Register user

export const getRegisterUser = createAsyncThunk(
  'user/getRegisterUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/register', user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

//  Hold Logged in Users

export const getLoggedInUsers = createAsyncThunk(
  'user/getLoggedInUsers',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/login', user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen
    },
    logoutUser: (state) => {
      state.user = null
      removeUserFromLocalStorage()
    },
  },

  extraReducers: {
    [getRegisterUser.pending]: (state) => {
      state.isLoading = true
    },

    [getRegisterUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      const { user } = payload
      state.user = user
      toast.success(`Hello there , ${user.name}`)
      addUserToLocalStorage(user)
    },
    [getRegisterUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`Server msg : ${payload}`)
    },
    [getLoggedInUsers.pending]: (state) => {
      state.isLoading = true
    },
    [getLoggedInUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      const { user } = payload
      state.user = user
      toast.success(`Welcome back , ${user.name}`)
      addUserToLocalStorage(user)
    },
    [getLoggedInUsers.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { toggleSidebar, logoutUser } = userSlice.actions

export default userSlice.reducer
