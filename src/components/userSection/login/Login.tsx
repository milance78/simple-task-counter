import './Login.scss'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'
import { auth, db } from '../../../firebase/firebase-config'
import { Button, TextField, Alert } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch } from '../../../redux/store'
import { loginSuccess, switchToRegister } from '../../../redux/features/profileSlice'
import { mapFirebaseError } from '../../../functions/mapFirebaseError'

const Login = () => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submitHandler = async () => {
    if (!username || !password) {
      setError('Username and password are required.')
      return
    }

    setError(null)
    setLoading(true)

    try {
      // 1️⃣ Find user by username
      const q = query(
        collection(db, 'users'),
        where('username', '==', username)
      )

      const snap = await getDocs(q)

      if (snap.empty) {
        setError('Invalid username or password.')
        setLoading(false)
        return
      }

      const userDoc = snap.docs[0].data()
      const email = userDoc.email

      // 2️⃣ Authenticate with email + password
      const res = await signInWithEmailAndPassword(auth, email, password)

      dispatch(loginSuccess(res.user))
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
    <div className="login-container">
      <h3>Login</h3>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Username"
        variant='standard'
        onChange={e => setUsername(e.target.value)}
        disabled={loading}
        fullWidth
      />

      <TextField
        label="Password"
        variant='standard'
        type="password"
        onChange={e => setPassword(e.target.value)}
        disabled={loading}
        fullWidth
      />

      <Button onClick={submitHandler} disabled={loading}>
        {loading ? 'Logging in…' : 'Login'}
      </Button>

      <p>
        No account?{' '}
        <span onClick={() => dispatch(switchToRegister())}>Register</span>
      </p>
    </div>
  )
}

export default Login
