import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

export type ProfileNavigation = 'login' | 'register' | 'current'

interface ProfileState {
  isLoggedIn: boolean
  currentUser: User | null
  profileNavigation: ProfileNavigation
}

const initialState: ProfileState = {
  isLoggedIn: false,
  currentUser: null,
  profileNavigation: 'login',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true
      state.currentUser = action.payload
      state.profileNavigation = 'current'
    },

    logout(state) {
      state.isLoggedIn = false
      state.currentUser = null
      state.profileNavigation = 'login'
    },

    switchToLogin(state) {
      state.profileNavigation = 'login'
    },

    switchToRegister(state) {
      state.profileNavigation = 'register'
    },
  },
})

export const {
  loginSuccess,
  logout,
  switchToLogin,
  switchToRegister,
} = profileSlice.actions

export default profileSlice.reducer
