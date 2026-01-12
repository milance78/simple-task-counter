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
      console.log('Querying Firestore for username:', username)

      // 1️⃣ Find user by username
      const q = query(
        collection(db, 'users'),
        where('username', '==', username)
      )
      const snap = await getDocs(q)

      if (snap.empty) {
        setError('Username not found.')
        return
      }

      const userDoc = snap.docs[0].data()
      const email = userDoc.email
      console.log('Found user email:', email)

      // 2️⃣ Authenticate with Firebase Auth
      const res = await signInWithEmailAndPassword(auth, email, password)
      console.log('Login success:', res.user)

      // 3️⃣ Update Redux
      dispatch(loginSuccess(res.user))

    } catch (err) {
      console.error('Login error:', err)

      if (err instanceof FirebaseError) {
        setError(mapFirebaseError(err.code))
      } else {
        setError('Operation failed. Please check your network or credentials.')
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
