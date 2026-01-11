import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
import { UserProfile } from '../../types/UserProfile'

export type ProfileNavigation = 'login' | 'register' | 'current'

interface ProfileState {
    isLoggedIn: boolean,
    isFormVisible: boolean,
    currentUser: User | null
    profileNavigation: ProfileNavigation
    authUser: User | null
    userProfile: UserProfile | null
}

const initialState: ProfileState = {
    isLoggedIn: false,
    currentUser: null,
    profileNavigation: 'login',
    isFormVisible: false,
    authUser: null,
    userProfile: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<User>) {
            state.isLoggedIn = true;
            state.currentUser = action.payload;
            state.isFormVisible = false;
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
        toggleFormVisibility(state) {
            state.isFormVisible = !state.isFormVisible
        },
        setFormVisibility(state, action: PayloadAction<boolean>) {
            state.isFormVisible = action.payload
        },
        setAuthUser(state, action: PayloadAction<User>) {
            state.authUser = action.payload
            state.isLoggedIn = true
        },
        setUserProfile(state, action: PayloadAction<UserProfile>) {
            state.userProfile = action.payload
        }
    },
})

export const {
    loginSuccess,
    logout,
    switchToLogin,
    switchToRegister,
    toggleFormVisibility,
    setFormVisibility,
    setAuthUser,
    setUserProfile,
} = profileSlice.actions

export default profileSlice.reducer
