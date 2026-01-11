import './Register.scss'
import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'

import { auth, db } from '../../../firebase/firebase-config'
import { useAppDispatch } from '../../../redux/store'
import {
  loginSuccess,
  switchToLogin,
} from '../../../redux/features/profileSlice'
import { mapFirebaseError } from '../../../functions/mapFirebaseError'

const Register = () => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submitHandler = async () => {
    if (!username || !email || !password) {
      setError('All fields are required.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // 1️⃣ CHECK USERNAME UNIQUENESS
      const q = query(
        collection(db, 'users'),
        where('username', '==', username)
      )

      const snap = await getDocs(q)

      if (!snap.empty) {
        setError('Username already taken.')
        setLoading(false)
        return
      }

      // 2️⃣ CREATE AUTH USER
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = res.user

      // 3️⃣ CREATE FIRESTORE USER DOCUMENT
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username,
        email: user.email,
        role: 'user',
        countersCount: 0,
        createdAt: serverTimestamp(),
      })

      // 4️⃣ UPDATE REDUX STATE
      dispatch(loginSuccess(user))
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(mapFirebaseError(err.code))
      } else {
        setError('Unexpected error. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-container">
      <h3>Register</h3>

      <TextField
        label="Username"
        variant='standard'
        value={username}
        onChange={e => setUsername(e.target.value)}
        fullWidth
        disabled={loading}
      />

      <TextField
        label="Email"
        variant='standard'
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        disabled={loading}
      />

      <TextField
        label="Password"
        type="password"
        variant='standard'
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        disabled={loading}
      />

      {error && <p className="error">{error}</p>}

      <Button onClick={submitHandler} disabled={loading}>
        {loading ? 'Creating account...' : 'Register'}
      </Button>

      <p>
        Already have an account?{' '}
        <span onClick={() => dispatch(switchToLogin())}>Login</span>
      </p>
    </div>
  )
}

export default Register
