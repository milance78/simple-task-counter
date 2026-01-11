import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { auth, db } from '../firebase/firebase-config'
import { useAppDispatch } from '../redux/store'
import {
  setAuthUser,
  setUserProfile,
  logout,
} from '../redux/features/profileSlice'

import { UserProfile } from '../types/UserProfile'

interface Props {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async user => {
      if (!user) {
        dispatch(logout())
        return
      }

      // 1️⃣ Store auth user
      dispatch(setAuthUser(user))

      // 2️⃣ Load Firestore user profile
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists()) {
        dispatch(setUserProfile(snap.data() as UserProfile))
      }
    })

    return () => unsub()
  }, [dispatch])

  return <>{children}</>
}

export default AuthProvider